import { Router } from "express";
import authRoute from "./authRoute.js";
import laundryRoute from "./laundryRoute.js";
import orderRoute from "./orderRoute.js";
import userRoute from "./userRoute.js";
import serviceRoute from "./serviceRoute.js";
import { google_auth_url } from "../config.js";

export const allRoutes = Router();

allRoutes.get("/", (req, res) => {
    res.json({ message : google_auth_url(req) });
})

allRoutes.use("/auth", authRoute)
allRoutes.use("/api/laundry", laundryRoute)
allRoutes.use("/api/order", orderRoute)
allRoutes.use("/api/user", userRoute)
allRoutes.use("/api/services", serviceRoute)