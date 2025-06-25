import { verifyJWT } from "@/utils/helpers";
import { Vendor } from "@/models/Vendor";
import { Request, Response } from "express";


/**
 * @desc    Get all vendor services
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/vendors
 * @access  Public
 */
export async function getAllVendors(req: Request, res: Response) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skipN = (Number(page) - 1) * Number(limit);

        const vendors = await Vendor.find().populate("owner", "name email phone").skip(skipN).limit(Number(limit));

        if (!vendors.length) {
            res.status(200).json({
                success: true,
                count: 0,
                message: "No vendors found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            count: vendors.length,
            data: vendors
        });
    }

    catch (error: any) {
        console.error("Error fetching vendor services:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching vendor services",
            error: error.message
        });
    }
};

/**Get vendor service by ID
 * @route   GET /api/vendors/:id
 * @access  Public
 */
export async function getVendorById(req: Request, res: Response) {
    try {
        // try to find vendor by its id and also fill the data of owner from Users collection
        // populate the owner field with name, email, and phone from the User model
        const vendor = await Vendor.findById(req.params.id).populate("owner", "name email phone");

        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (error: any) {
        console.error("Error fetching vendor:", error);

        if (error.kind === "ObjectId") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while fetching laundry service",
            error: error.message
        });
    }
};

/**
 * @desc    Create new vendor service
 * @route   POST /api/vendors
 * @access  Private (Owner)
 */
export async function createVendor(req: Request, res: Response) {
    try {

        const { status, location } = req.body;
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        // Validate location data
        if (!location || !location.coordinates) {
            res.status(400).json({
                success: false,
                message: "Please provide valid location data with coordinates"
            });
        }

        // Create new laundry service
        const newVendor = new Vendor({
            status: status || true,
            location,
            owner: user?._id
        });

        const savedLaundryService = await newVendor.save();

        res.status(201).json({
            success: true,
            message: "Laundry service created successfully",
            data: savedLaundryService
        });
    } catch (error: any) {
        console.error("Error creating laundry service:", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating laundry service",
            error: error.message
        });
    }
};

/**
 * @desc    Update laundry service
 * @route   PUT /api/vendors/:id
 * @access  Private (Owner)
 */
export async function updateVendor(req: Request, res: Response) {
    try {
        const { status, location, rating } = req.body;

        // Find vendor
        let vendor = await Vendor.findById(req.params.id);
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
            return;
        }

        // Check ownership
        if (user?.role != "admin" || vendor.owner.toString() === user?._id){
                res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this vendor"
                });
        }

        // Update fields
        if (status !== undefined) vendor.status = status;
        if (location) vendor.location = location;
        if (rating !== undefined && rating >= 0 && rating <= 5) vendor.rating = rating;

        // Save updated vendor
        const updatedVendor = await vendor.save();

        res.status(200).json({
            success: true,
            message: "Vendor updated successfully",
            data: updatedVendor
        });
    } catch (error: any) {
        console.error("Error updating vendor:", error);

        if (error.kind === "ObjectId") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while updating laundry service",
            error: error.message
        });
    }
};


/**
 * @desc    Delete vendor
 * @route   DELETE /api/vendors/:id
 * @access  Private (Owner)
 */
export async function deleteVendor(req: Request, res: Response) {
    try {
        // Find vendor
        const vendor = await Vendor.findById(req.params.id);
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
            return;
        }

        // Check ownership
        if (user?.role != "admin" || vendor.owner.toString() === user?._id){
                res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this vendor"
                });
        }

        // Delete vendor
        await vendor.deleteOne(
            { _id: req.params.id }
        );

        res.status(200).json({
            success: true,
            message: "Vendor deleted successfully"
        });

    }
    
    catch (error: any) {
        console.error("Error deleting vendor:", error);

        if (error.kind === "ObjectId") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while deleting laundry service",
            error: error.message
        });
    }
};



/**
 * @desc    Get vendor services by proximity
 * @route   GET /api/vendors/nearby?lat={lat}&lng={lng}&distance={distance}
 * @access  Public
 */
export async function getNearbyVendor(req: Request, res: Response) {
    try {
        const { lat, lng, distance = 5000 } = req.query;

        const latitude = Number(lat);
        const longitude = Number(lng);
        const maxDistance = Number(distance);

        if (!latitude || !longitude) {
            res.status(400).json({
                success: false,
                message: "Please provide latitude and longitude coordinates"
            });
        }

        // Find vendor within the specified radius
        const nearbyVendors = await Vendor.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            },
            status: true // Only active vendors
        }).populate("owner", "name email phone");

        res.status(200).json({
            success: true,
            count: nearbyVendors.length,
            data: nearbyVendors
        });
    } catch (error: any) {
        console.error("Error finding nearby vendors:", error);
        res.status(500).json({
            success: false,
            message: "Server error while finding nearby vendors",
            error: error.message
        });
    }
};



/**
 * @desc    Update vendor rating
 * @route   PATCH /api/vendors/:id/rating
 * @access  Private (Authenticated user)
 */
export async function updateVendorRating(req: Request, res: Response) {
    try {
        const { rating } = req.body;

        if (rating === undefined || rating < 0 || rating > 5) {
            res.status(400).json({
                success: false,
                message: "Please provide a valid rating between 0 and 5"
            });
        }

        // Find vendor
        const vendor = await Vendor.findById(req.params.id);

        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
            return;
        }

        // Update rating
        vendor.rating = rating;

        // Save updated vendor
        const updatedVendor = await vendor.save();

        res.status(200).json({
            success: true,
            message: "Vendor rating updated successfully",
            data: updatedVendor
        });
    } catch (error: any) {
        console.error("Error updating vendor rating:", error);

        if (error.kind === "ObjectId") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while updating rating",
            error: error.message
        });
    }
};


/**Toggle vendor status (active/inactive)
 * @route   PATCH /api/vendors/:id/toggle-status
 * @access  Private (Owner)
 */
export async function toggleVendorStatus(req: Request, res: Response) {
    try {
        // Find vendor, next step to cache the data for fast retrieval
        const vendor = await Vendor.findById(req.params.id);

        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
            return;
        }

        // Toggle status
        vendor.status = !vendor.status;

        // Save updated vendor
        const updatedVendor = await vendor.save();

        res.status(200).json({
            success: true,
            message: `Vendor ${updatedVendor.status ? 'activated' : 'deactivated'} successfully`,
            data: updatedVendor
        });

    } catch (error: any) {
        console.error("Error toggling vendor status:", error);

        if (error.kind === "ObjectId") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while toggling service status",
            error: error.message
        });
    }
};
