import { Router } from 'express';
import { hasRole, isOwner } from '@/middlewares/authentication';
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getNearbyVendor,
  updateVendorRating,
  toggleVendorStatus,
} from '@/controllers/vendorHandler';

const vendorRoute = Router();

// Public routes
vendorRoute.get('/', getAllVendors);
vendorRoute.get('/nearby', getNearbyVendor);
vendorRoute.get('/:id', getVendorById);

// Protected routes - requiring base authentication
vendorRoute.post('/', hasRole('user'), createVendor);
vendorRoute.put('/:id', isOwner, updateVendor);
vendorRoute.delete('/:id', isOwner, deleteVendor);
vendorRoute.patch('/:id/rating', hasRole('user'), updateVendorRating);
vendorRoute.patch('/:id/toggle-status', isOwner, toggleVendorStatus);

export default vendorRoute;
