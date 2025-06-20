import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from "../controllers/orderHandler.js";

const orderRoute = Router();

// Order operations
orderRoute.post("/", createOrder);
orderRoute.get("/", getAllOrders);
orderRoute.get("/:id", getOrderById);
orderRoute.put("/:id", updateOrderById);
orderRoute.delete("/:id", deleteOrderById);

export default orderRoute;