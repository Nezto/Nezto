
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
            res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Verify user exists
        const userDoc = await User.findById(user).session(session);
        if (!userDoc) {
            res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify vendor exists and has vendor role
        const vendorDoc = await User.findById(vendor).session(session);
        if (!vendorDoc || !vendorDoc.role.includes('vendor')) {
            res.status(404).json({ success: false, message: "Vendor not found or invalid" });
            return;
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
        await session.commitTransaction();

        res.status(201).json(
            new ApiResponse(201, order, "Order created successfully. Waiting for vendor acceptance.")
        );

    }

    catch (error: any) {
        await session.abortTransaction();
        console.error("Error creating order:", error);
        res.status(500).json(
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
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        if (order.vendor.toString() !== vendorId) {
            res.status(403).json({ success: false, message: "Not authorized" });
        }

        if (order.status !== "pending") {
            res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Generate user OTP
        const userOTP = generateOTP();
        order.otp = userOTP;
        order.status = "accepted";
        await order.save({ session });

        // Find user location for rider matching
        const user = await User.findById(order.user).session(session);
        if (!user || !user.location) {
            res.status(404).json({ success: false, message: "User location not found" });
            return;
        }

        // Find nearby riders (15km radius)
        const riders = await User.find({
            role: 'rider',
            location: { $exists: true }
        }).session(session);

        const nearbyRiders = riders.filter(rider => {
            try {
                const distance = calculateDistance(user.location, rider.location);
                distance <= 15;
            } catch (e) {
                console.error(`Distance error for rider ${rider._id}:`, e);
                false;
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

        res.status(200).json(
            new ApiResponse(200, order, "Order accepted by vendor. User OTP generated. Searching for riders.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in vendor acceptance:", error);
        res.status(500).json(
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
            res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "accepted") {
            res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify rider exists
        const rider = await User.findById(riderId).session(session);
        if (!rider || !rider.role.includes('rider')) {
            res.status(404).json({ success: false, message: "Rider not found" });
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

        res.status(200).json(
            new ApiResponse(200, order, "Rider assigned. User notified with OTP.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in rider acceptance:", error);
        res.status(500).json(
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
            res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "to_client") {
            res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify OTP matches
        if (order.otp !== otp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Generate vendor OTP
        const vendorOTP = generateOTP();
        order.otp = vendorOTP;
        order.status = "to_vendor"; // Update status to indicate user verified
        await order.save({ session });
        await session.commitTransaction();
        res.status(200).json(
            new ApiResponse(200, order, "User OTP verified. Vendor OTP generated.")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in user OTP verification:", error);
        res.status(500).json(
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
            res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "to_vendor") {
            res.status(400).json({ success: false, message: "Invalid order state" });
        }

        // Verify OTP matches
        if (order.otp !== otp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
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

        res.status(200).json(
            new ApiResponse(200, order, "Vendor OTP verified. Order completed successfully.")
        );

    } 
    
    catch (error: any) {
        await session.abortTransaction();
        console.error("Error in vendor OTP verification:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error", error.message)
        );
    } 
    
    finally {
        session.endSession();
    }
}



/**
 * @description Delete an order by ID
 * @route DELETE /api/order/:id
 */
async function deleteOrderById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json(new ApiResponse(400, null, "Invalid order ID"));
        }
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            res.status(404).json(new ApiResponse(404, null, "Order not found"));
        }
        res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
}

export {
    createOrder,
    vendorAcceptOrder,
    riderAcceptOrder,
    verifyUserOTP,
    verifyVendorOTP,
    deleteOrderById
};

