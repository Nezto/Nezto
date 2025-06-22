// contains all the service related functions

import { Service } from "@/models/Service";
import { ApiResponse } from "@/utils/helpers";
import { Request, Response } from "express";


interface ServiceFilter {
    category?: string;
    page?: number;
}


/**Get all services
 * @route   GET /api/services
 * @access  Public
 */
export async function getAllServices(req: Request, res: Response){
    try {
        const { category, page } = req.query;

        const services = await Service.find({
            category: category || "daily",
            active: true
        }).skip((Number(page) || 0) * 10).limit(10);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } 
    
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**Get a single service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export async function getServiceById(req: Request, res: Response){
    try {
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**Create a new service
 * @route   POST /api/services
 * @access  Private/Admin
 */
export async function createService(req: Request, res: Response){
    try {
        const { serviceId, name, description, price, category, popular, turnaround, icon } = req.body;

        // Check if service with same ID already exists
        const serviceExists = await Service.findOne({ serviceId });
        if (serviceExists) {
            res.status(400).json({
                success: false,
                message: "Service with this ID already exists",
            });
        }

        const service = await Service.create({
            serviceId,
            name,
            description,
            price,
            category,
            popular: popular || false,
            turnaround,
            icon: icon || null,
        });

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service,
        });
    }
    catch (error: any) {
        const apiResponse = new ApiResponse(500, null, "Server Error", error.message);
        res.status(apiResponse.status).json({
            success: false,
            message: apiResponse.message,
            error: apiResponse.error,
        });
    }
};

/**
 * @desc    Update a service
 * @route   PUT /api/services/:id
 * @access  Private/Admin
 */
export async function updateService(req: Request, res: Response) {
    try {
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const updatedService = await Service.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: updatedService,
        });
    }
    
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc    Delete a service
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
 */
export async function deleteService(req: Request, res: Response){
    try {
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        await Service.findOneAndDelete({ serviceId: req.params.id });

        res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc    Toggle service active status
 * @route   PATCH /api/services/:id/toggle-status
 * @access  Private/Admin
 */
export async function toggleServiceStatus(req: Request, res: Response){
    try {
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            res.status(404).json({
                success: false,
                message: "Service not found",
            });
            return;
        }

        service.active = !service.active;
        await service.save();

        res.status(200).json({
            success: true,
            message: `Service ${service.active ? 'activated' : 'deactivated'} successfully`,
            data: service,
        });
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc    Get all popular services
 * @route   GET /api/services/popular
 * @access  Public
 */
export async function getPopularServices(req: Request, res: Response){
    const { page } = req.query;

    try {
        const services = await Service.find({ popular: true, active: true }).skip(Number(page || 0) * 10).limit(10);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    }

    catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
