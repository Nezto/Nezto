import { verifyJWT } from "@/utils/helpers";
import { Vendor } from "@/models/Vendor";
import { Request, Response } from "express";
import { all, one } from "@/utils/check";

/**
 * @desc    Get all laundry services
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/laundry
 * @access  Public
 */
export async function getAllLaundryServices(req: Request, res: Response) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skipN = (Number(page) - 1) * Number(limit);

        const laundryServices = await Vendor.find().populate("owner", "name email phone").skip(skipN).limit(Number(limit));

        if (!laundryServices.length) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No laundry services found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            count: laundryServices.length,
            data: laundryServices
        });
    }

    catch (error: any) {
        console.error("Error fetching laundry services:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching laundry services",
            error: error.message
        });
    }
};

/**Get laundry service by ID
 * @route   GET /api/laundry/:id
 * @access  Public
 */
export async function getLaundryServiceById(req: Request, res: Response) {
    try {
        // try to find laundry by its id and also fill the data of owner from Users collection
        // populate the owner field with name, email, and phone from the User model
        const laundryService = await Vendor.findById(req.params.id).populate("owner", "name email phone");

        if (!laundryService) {
            return res.status(404).json({
                success: false,
                message: "Laundry service not found"
            });
        }

        res.status(200).json({
            success: true,
            data: laundryService
        });
    } catch (error: any) {
        console.error("Error fetching laundry service:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
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
 * @desc    Create new laundry service
 * @route   POST /api/laundry
 * @access  Private (Owner)
 */
export async function createLaundryService(req: Request, res: Response) {
    try {

        const { status, location } = req.body;
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        // Validate location data
        if (!location || !location.coordinates || !location.type) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid location data with type and coordinates"
            });
        }

        // Create new laundry service
        const newLaundryService = new Vendor({
            status: status || true,
            location,
            owner: user?._id
        });

        const savedLaundryService = await newLaundryService.save();

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
 * @route   PUT /api/laundry/:id
 * @access  Private (Owner)
 */
export async function updateLaundryService(req: Request, res: Response) {
    try {
        const { status, location, rating } = req.body;

        // Find laundry service
        let laundryService = await Vendor.findById(req.params.id);
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        if (!laundryService) {
            return res.status(404).json({
                success: false,
                message: "Laundry service not found"
            });
        }

        // Check ownership
        if (user?.role != "admin" || laundryService.owner.toString() === user?._id){
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this laundry service"
                });
        }

        // Update fields
        if (status !== undefined) laundryService.status = status;
        if (location) laundryService.location = location;
        if (rating !== undefined && rating >= 0 && rating <= 5) laundryService.rating = rating;

        // Save updated service
        const updatedService = await laundryService.save();

        res.status(200).json({
            success: true,
            message: "Laundry service updated successfully",
            data: updatedService
        });
    } catch (error: any) {
        console.error("Error updating laundry service:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
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
 * @desc    Delete laundry service
 * @route   DELETE /api/laundry/:id
 * @access  Private (Owner)
 */
export async function deleteLaundryService(req: Request, res: Response) {
    try {
        // Find laundry service
        const laundryService = await Vendor.findById(req.params.id);
        const user = verifyJWT(req.cookies.token || req.headers.authorization?.split(' ')[1]);

        if (!laundryService) {
            return res.status(404).json({
                success: false,
                message: "Laundry service not found"
            });
        }

        // Check ownership
        if (user?.role != "admin" || laundryService.owner.toString() === user?._id){
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this laundry service"
                });
        }

        // Delete service
        await laundryService.deleteOne(
            { _id: req.params.id }
        );

        res.status(200).json({
            success: true,
            message: "Laundry service deleted successfully"
        });

    }
    
    catch (error: any) {
        console.error("Error deleting laundry service:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
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
 * @desc    Get laundry services by proximity
 * @route   GET /api/laundry/nearby?lat={lat}&lng={lng}&distance={distance}
 * @access  Public
 */
export async function getNearbyLaundryServices(req: Request, res: Response) {
    try {
        const { lat, lng, distance = 5000 } = req.query;

        const latitude = Number(lat);
        const longitude = Number(lng);
        const maxDistance = Number(distance);

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "Please provide latitude and longitude coordinates"
            });
        }

        // Find laundry services within the specified radius
        const nearbyServices = await Vendor.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            },
            status: true // Only active services
        }).populate("owner", "name email phone");

        res.status(200).json({
            success: true,
            count: nearbyServices.length,
            data: nearbyServices
        });
    } catch (error: any) {
        console.error("Error finding nearby laundry services:", error);
        res.status(500).json({
            success: false,
            message: "Server error while finding nearby services",
            error: error.message
        });
    }
};



/**
 * @desc    Update laundry service rating
 * @route   PATCH /api/laundry/:id/rating
 * @access  Private (Authenticated user)
 */
export async function updateLaundryRating(req: Request, res: Response) {
    try {
        const { rating } = req.body;

        if (rating === undefined || rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid rating between 0 and 5"
            });
        }

        // Find laundry service
        const laundryService = await Vendor.findById(req.params.id);

        if (!laundryService) {
            return res.status(404).json({
                success: false,
                message: "Laundry service not found"
            });
        }

        // Update rating
        laundryService.rating = rating;

        // Save updated service
        const updatedService = await laundryService.save();

        res.status(200).json({
            success: true,
            message: "Laundry service rating updated successfully",
            data: updatedService
        });
    } catch (error: any) {
        console.error("Error updating laundry rating:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
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


/**Toggle laundry service status (active/inactive)
 * @route   PATCH /api/laundry/:id/toggle-status
 * @access  Private (Owner)
 */
export async function toggleLaundryServiceStatus(req: Request, res: Response) {
    try {
        // Find laundry service, next step to cache the data for fast retrieval
        const laundryService = await Vendor.findById(req.params.id);

        if (!laundryService) {
            return res.status(404).json({
                success: false,
                message: "Laundry service not found"
            });
        }

        // Toggle status
        laundryService.status = !laundryService.status;

        // Save updated service
        const updatedService = await laundryService.save();

        res.status(200).json({
            success: true,
            message: `Laundry service ${updatedService.status ? 'activated' : 'deactivated'} successfully`,
            data: updatedService
        });

    } catch (error: any) {
        console.error("Error toggling laundry service status:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
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
