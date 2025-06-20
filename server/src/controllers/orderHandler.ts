
import mongoose from "mongoose";
import { io } from "@/socket/socket";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { ApiResponse } from "@/utils/helpers";
import { Request, Response } from "express";
import { calculateDistance } from "@/utils/approxDistanceCount";
import crypto from "crypto";


const generateOTP = () => crypto.randomInt(100000, 999999).toString();



/**Create new order (without OTP initially)*/
async function createOrder(req: Request, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { price, type, user, vendor, pick_time, drop_time } = req.body;

        // Validate required fields
        if (!price || !type || !user || !vendor || !pick_time || !drop_time) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Verify user exists
        const userDoc = await User.findById(user).session(session);
        if (!userDoc) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify vendor exists and has vendor role
        const vendorDoc = await User.findById(vendor).session(session);
        if (!vendorDoc || !vendorDoc.role.includes('vendor')) {
            return res.status(404).json({ success: false, message: "Vendor not found or invalid" });
        }

        // Create order
        const order = new Order({
            price,
            type,
            user,
            vendor,
            pick_time: new Date(pick_time),
            drop_time: new Date(drop_time),
            status: "pending"
        });

        await order.save({ session });

        // Notify vendor via socket
        io.to(`vendor_${vendor}`).emit('new_order', {
            orderId: order._id,
            user: {
                id: userDoc._id,
                name: userDoc.name,
                location: userDoc.location
            },
            details: {
                type,
                pick_time,
                drop_time,
                price
            }
        });

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(201, order, "Order created successfully. Waiting for vendor acceptance.")
        );

    }

    catch (error: any) {
        await session.abortTransaction();
        console.error("Error creating order:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error")
        );
    } finally {
        session.endSession();
    }
}

/**
 * @description Vendor accepts order and generates user OTP
 */
async function vendorAcceptOrder(req: Request, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { vendorId } = req.body;

        // Find and validate order
        const order = await Order.findById(id).session(session);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.vendor.toString() !== vendorId) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        if (order.status !== "pending") {
            return res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Generate user OTP
        const userOTP = generateOTP();
        order.otp = userOTP;
        order.status = "accepted";
        await order.save({ session });

        // Find user location for rider matching
        const user = await User.findById(order.user).session(session);
        if (!user || !user.location) {
            return res.status(404).json({ success: false, message: "User location not found" });
        }

        // Find nearby riders (15km radius)
        const riders = await User.find({
            role: 'rider',
            location: { $exists: true }
        }).session(session);

        const nearbyRiders = riders.filter(rider => {
            try {
                const distance = calculateDistance(user.location, rider.location);
                return distance <= 15;
            } catch (e) {
                console.error(`Distance error for rider ${rider._id}:`, e);
                return false;
            }
        });

        // Notify nearby riders
        nearbyRiders.forEach(rider => {
            io.to(`rider_${rider._id}`).emit('order_available', {
                orderId: order._id,
                user: {
                    id: user._id,
                    name: user.name,
                    location: user.location
                },
                vendor: {
                    id: vendorId,
                    name: vendorDoc.name,
                    location: vendorDoc.location
                },
                details: {
                    type: order.type,
                    pick_time: order.pick_time,
                    drop_time: order.drop_time,
                    price: order.price
                }
            });
        });

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, order, "Order accepted by vendor. User OTP generated. Searching for riders.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in vendor acceptance:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error")
        );
    } finally {
        session.endSession();
    }
}

/**
 * @description Rider accepts order
 */
async function riderAcceptOrder(req: Request, res: Response): Promise<Response> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { riderId } = req.body;

        // Find and validate order
        const order = await Order.findById(id).session(session);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "accepted") {
            return res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify rider exists
        const rider = await User.findById(riderId).session(session);
        if (!rider || !rider.role.includes('rider')) {
            return res.status(404).json({ success: false, message: "Rider not found" });
        }

        // Assign rider and update status
        order.rider = riderId;
        order.status = "to_client";
        await order.save({ session });

        // Notify user with OTP
        io.to(`user_${order.user}`).emit('rider_assigned', {
            orderId: order._id,
            rider: {
                id: rider._id,
                name: rider.name,
                picture: rider.picture
            },
            user_otp: order.otp,
            pick_time: order.pick_time
        });

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, order, "Rider assigned. User notified with OTP.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in rider acceptance:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error")
        );
    } finally {
        session.endSession();
    }
}

/**
 * @description Verify user OTP (when rider collects laundry)
 */
async function verifyUserOTP(req: Request, res: Response): Promise<Response> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { otp } = req.body;

        // Find and validate order
        const order = await Order.findById(id).session(session);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "to_client") {
            return res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify OTP matches
        if (order.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Generate vendor OTP
        const vendorOTP = generateOTP();
        order.otp = vendorOTP;
        order.status = "to_vendor"; // Update status to indicate user verified
        await order.save({ session });

        // Notify vendor with OTP
        // io.to(`vendor_${order.vendor}`).emit('ready_for_delivery', {
        //     orderId: order._id,
        //     vendor_otp: vendorOTP,
        //     rider: {
        //         id: order.rider,
        //         name: (await User.findById(order.rider)).name
        //     },
        //     drop_time: order.drop_time
        // });

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, order, "User OTP verified. Vendor OTP generated.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in user OTP verification:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error")
        );
    } finally {
        session.endSession();
    }
}

/**
 * @description Verify vendor OTP (when rider delivers laundry)
 */
async function verifyVendorOTP(req: Request, res: Response): Promise<Response> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { otp } = req.body;

        // Find and validate order
        const order = await Order.findById(id).session(session);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "to_vendor") {
            return res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify OTP matches
        if (order.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Complete the order
        order.status = "completed";
        order.completed_at = new Date();
        await order.save({ session });

        // Notify all parties
        const emitData = {
            orderId: order._id,
            completed_at: order.completed_at
        };

        io.to(`user_${order.user}`).emit('order_completed', emitData);
        io.to(`vendor_${order.vendor}`).emit('order_completed', emitData);
        io.to(`rider_${order.rider}`).emit('order_completed', emitData);

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, order, "Vendor OTP verified. Order completed successfully.")
        );

    } 
    
    catch (error: any) {
        await session.abortTransaction();
        console.error("Error in vendor OTP verification:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error", error.message)
        );
    } 
    
    finally {
        session.endSession();
    }
}


/**
 * @description Get all orders with populated user, vendor and rider details
 * @route GET /api/order
 */
async function getAllOrders(req: Request, res: Response): Promise<Response> {
    try {
        // Add optional query parameters for filtering
        const { status, type, vendor_id, user_id } = req.query;

        // Build filter object
        const filter = {};
        if (status) filter.status = status;
        if (type) filter.type = type;
        if (vendor_id && mongoose.Types.ObjectId.isValid(vendor_id)) {
            filter.vendor = vendor_id;
        }
        if (user_id && mongoose.Types.ObjectId.isValid(user_id)) {
            filter.user = user_id;
        }

        // Get orders with populated fields
        const orders = await Order.find(filter)
            .populate({
                path: "user",
                select: "name email picture", // Added picture to the selection
                model: "User"
            })
            .populate({
                path: "vendor",
                select: "name email picture", // Added picture to the selection
                model: "User"
            })
            .populate({
                path: "rider",
                select: "name email picture", // Added picture to the selection
                model: "User"
            })
            .sort({ createdAt: -1 }); // Sort by newest first

        // Security check - remove sensitive data if needed
        const sanitizedOrders = orders.map(order => {
            const orderObj = order.toObject();
            // Remove OTP from the response if it's sensitive
            orderObj.otp = '***'; // Mask OTP for security
            return orderObj;
        });

        return res.status(200).json(
            new ApiResponse(200, sanitizedOrders, "Orders fetched successfully")
        );
    } catch (error : any) {
        console.error("Error fetching orders:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error", error.message)
        );
    }
}



/**
 * @description Get a specific order by ID with populated user, vendor and rider details
 * @route GET /api/order/:id
 */
async function getOrderById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                new ApiResponse(400, null, "Invalid order ID format")
            );
        }

        // Fetch order with populated details
        const order = await Order.findById(id)
            .populate({
                path: "user",
                select: "name email picture role",
                model: "User"
            })
            .populate({
                path: "vendor",
                select: "name email picture role",
                model: "User"
            })
            .populate({
                path: "rider",
                select: "name email picture role",
                model: "User"
            })
            .lean(); // Convert to plain JavaScript object for modification

        // Check if order exists
        if (!order) {
            return res.status(404).json(
                new ApiResponse(404, null, "Order not found")
            );
        }

        // Calculate distance if pickup and drop locations exist
        let distance = null;
        if (order.pickup_location && order.drop_location) {
            try {
                distance = calculateDistance(
                    order.pickup_location,
                    order.drop_location
                );
                // Round to 2 decimal places for cleaner display
                distance = Math.round(distance * 100) / 100;
            } catch (error) {
                console.error("Error calculating distance:", error);
                // Distance will remain null if calculation fails
            }
        }

        // Security and privacy modifications
        const sanitizedOrder = {
            ...order,
            // Remove sensitive fields
            otp: undefined,
            // Add calculated distance
            distance_km: distance,
            // Flatten populated user objects if needed
            user: order.user ? {
                id: order.user._id,
                name: order.user.name,
                email: order.user.email,
                picture: order.user.picture,
                role: order.user.role
            } : null,
            vendor: order.vendor ? {
                id: order.vendor._id,
                name: order.vendor.name,
                email: order.vendor.email,
                picture: order.vendor.picture,
                role: order.vendor.role
            } : null,
            rider: order.rider ? {
                id: order.rider._id,
                name: order.rider.name,
                email: order.rider.email,
                picture: order.rider.picture,
                role: order.rider.role
            } : null
        };

        return res.status(200).json(
            new ApiResponse(200, sanitizedOrder, "Order fetched successfully")
        );
    } catch (error) {
        console.error(`Error fetching order ${req.params.id}:`, error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error")
        );
    }
}

/**
 * @description Update an order by ID
 * @route PUT /api/order/:id
 */
async function updateOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { price, type, status, rider, pick_time, drop_time } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid order ID"));
    }

    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    // Update fields if provided
    if (price !== undefined) order.price = price;
    if (type !== undefined) order.type = type;
    if (status !== undefined) order.status = status;
    if (rider !== undefined) order.rider = rider;
    if (pick_time !== undefined) order.pick_time = pick_time;
    if (drop_time !== undefined) order.drop_time = drop_time;

    await order.save();

    return res.status(200).json(new ApiResponse(200, order, "Order updated successfully"));
}

/**
 * @description Delete an order by ID
 * @route DELETE /api/order/:id
 */
async function deleteOrderById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid order ID"));
        }
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json(new ApiResponse(404, null, "Order not found"));
        }
        return res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
    }
    catch (error: any) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
}

export {
    createOrder,
    vendorAcceptOrder,
    riderAcceptOrder,
    verifyUserOTP,
    verifyVendorOTP,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};

