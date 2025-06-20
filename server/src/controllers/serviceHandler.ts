// contains all the service related functions

import { Service } from "../models/Service.js";

/**
 * @desc    Get all services
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = async (req, res) => {
  try {
    const { category, page } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    if (page) {
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        filter.skip = skip;
        filter.limit = pageSize;
    }
    
    const services = await Service.find(filter);
    
    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single service by ID
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.id });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   POST /api/services
 * @access  Private/Admin
 */
export const createService = async (req, res) => {
  try {
    const { serviceId, name, description, price, category, popular, turnaround, icon } = req.body;
    
    // Check if service with same ID already exists
    const serviceExists = await Service.findOne({ serviceId });
    if (serviceExists) {
      return res.status(400).json({
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
    
    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Update a service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   PUT /api/services/:id
 * @access  Private/Admin
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.id });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    
    const updatedService = await Service.findOneAndUpdate(
      { serviceId: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.id });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    
    await Service.findOneAndDelete({ serviceId: req.params.id });
    
    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Toggle service active status
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   PATCH /api/services/:id/toggle-status
 * @access  Private/Admin
 */
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.id });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    
    service.isActive = !service.isActive;
    await service.save();
    
    return res.status(200).json({
      success: true,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all popular services
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/services/popular
 * @access  Public
 */
export const getPopularServices = async (req, res) => {
  try {
    const services = await Service.find({ popular: true, isActive: true });
    
    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
