
import { Router } from "express";
import {hasRole, isOwner} from "../middlewares/authentication.js";
import {
  getAllLaundryServices,
  getLaundryServiceById,
  createLaundryService,
  updateLaundryService,
  deleteLaundryService,
  getNearbyLaundryServices,
  updateLaundryRating,
  toggleLaundryServiceStatus
} from "../controllers/laundryHandler.js";

const laundryRoute = Router();

// Public routes
laundryRoute.get("/", getAllLaundryServices);
laundryRoute.get("/nearby", getNearbyLaundryServices);
laundryRoute.get("/:id", getLaundryServiceById);

// Protected routes - requiring base authentication
laundryRoute.post("/", hasRole('user'),  createLaundryService);
laundryRoute.put("/:id", isOwner, updateLaundryService);
laundryRoute.delete("/:id", isOwner, deleteLaundryService);
laundryRoute.patch("/:id/rating", hasRole('user'), updateLaundryRating);
laundryRoute.patch("/:id/toggle-status", isOwner,  toggleLaundryServiceStatus);

export default laundryRoute;