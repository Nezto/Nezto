import { Order } from "../models/Order.js";
import { ApiResponse } from "../utils/helpers.js";
import mongoose from "mongoose";
import {
    calculateDistance
} from "../utils/approxDistanceCount.js"

/**
 * @description Create a new order
 * @route POST /api/order
 * @param {import('express').Request} req - Express request object containing order details in body
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with created order
 */
async function createOrder(req, res) {
    try {
        const { price, type, user, vendor, pick_time, drop_time, otp } = req.body;
        
        // Validate required fields
        if (price == null || !type || !user || !vendor || !pick_time || !drop_time || !otp) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate ObjectId fields
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(vendor)) {
            return res.status(400).json({ success: false, message: "Invalid vendor ID" });
        }

        // Validate type against enum values
        const validTypes = ["wash", "dry_clean", "iron"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid order type. Must be one of: wash, dry_clean, iron" 
            });
        }

        // Validate dates
        const pickTime = new Date(pick_time);
        const dropTime = new Date(drop_time);
        if (isNaN(pickTime.getTime()) || isNaN(dropTime.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format" });
        }

        // Validate price is a number
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be a positive number" });
        }

        // Validate OTP is a string (as per your model comment)
        if (typeof otp !== 'string') {
            return res.status(400).json({ success: false, message: "OTP must be a string" });
        }

        const order = await Order.create({ 
            price, 
            type, 
            user, 
            vendor, 
            pick_time: pickTime, 
            drop_time: dropTime, 
            otp, 
            status: "pending" 
        });

        return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
    }
}


/**
 * @description Get all orders with populated user, vendor and rider details
 * @route GET /api/order
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with array of orders
 */
async function getAllOrders(req, res) {
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
            delete orderObj.otp;
            return orderObj;
        });

        return res.status(200).json(
            new ApiResponse(200, sanitizedOrders, "Orders fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Internal server error", false, error.message)
        );
    }
}



/**
 * @description Get a specific order by ID with populated user, vendor and rider details
 * @route GET /api/order/:id
 * @param {import('express').Request} req - Express request object containing order ID in params
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with requested order
 */
async function getOrderById(req, res) {
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
 * @param {import('express').Request} req - Express request object containing order ID in params and update fields in body
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with updated order
 */
async function updateOrderById(req, res) {
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
 * @param {import('express').Request} req - Express request object containing order ID in params
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response indicating successful deletion
 */
async function deleteOrderById(req, res) {
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
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error", error.message));
    }
}

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};

