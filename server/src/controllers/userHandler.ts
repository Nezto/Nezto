import { User } from "../models/User.js";
import { ApiResponse } from "../utils/helpers.js";

/**
 * @description Get all users
 * @route GET /api/user
 * @access Admin only
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function getAllUsers (req, res) {
    try {
        const users = await User.find({}).select("-token");

        return res.status(200).json(new ApiResponse(200, { users, count: users.length }, "Users fetched successfully"));
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Failed to fetch users", error.message));
    }
};

/**
 * @description Get user by ID
 * @route GET /api/user/:id
 * @access User level operation
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-token");
        if (!user) {
            return res.status(404).json(new ApiResponse(404, {}, "User not found"));
        }
        return res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Failed to fetch user", error.message));
    }
};

/**
 * @description Update user by ID
 * @route PATCH /api/user/:id
 * @access User level operation
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function updateUserById(req, res) {
    try {
        const { id } = req.params;
        const { name, picture, location, role } = req.body;

        // Find the user first to check if it exists
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json(new ApiResponse(404, {}, "User not found"));
        }

        // Create update object with only provided fields
        const updateData = {};
        if (name) updateData.name = name;
        if (picture) updateData.picture = picture;
        if (location) updateData.location = location;
        if (role) updateData.role = role;

        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).select("-token");

        return res.status(200).json(new ApiResponse(200, { user: updatedUser }, "User updated successfully"));
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Failed to update user", error.message));
    }
};

/**
 * @description Delete user by ID
 * @route DELETE /api/user/:id
 * @access Admin only
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function deleteUserById(req, res) {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json(new ApiResponse(404, {}, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Failed to delete user", error.message));
    }
};