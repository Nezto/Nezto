import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
  getPopularServices,
} from '../controllers/serviceHandler.js';
import { hasRole } from '../middlewares/authentication.js';

// Create router
const serviceRoute = Router();

// Public routes
serviceRoute.get('/', getAllServices);
serviceRoute.get('/popular', getPopularServices);
serviceRoute.get('/:id', getServiceById);

// Admin routes - requires admin role authentication
// Using hasRole("admin") ensures only admins can access these routes
serviceRoute.post('/', hasRole('admin'), createService);
serviceRoute.put('/:id', hasRole('admin'), updateService);
serviceRoute.delete('/:id', hasRole('admin'), deleteService);
serviceRoute.patch('/:id/toggle-status', hasRole('admin'), toggleServiceStatus);

export default serviceRoute;
