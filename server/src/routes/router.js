import { Router } from "express";
import authRoute from "./authRoute.js";
import laundryRoute from "./laundryRoute.js";
import orderRoute from "./orderRoute.js";
import userRoute from "./userRoute.js";
import serviceRoute from "./serviceRoute.js";
import { set_cookie } from "../utils/helpers.js";
import { google_auth_url } from "../config.js";

export const allRoutes = Router();

allRoutes.get("/", (req, res) => {
    set_cookie(req,res, "token", "test-secure");
    res.json({ message : google_auth_url(req) });
})

allRoutes.use("/auth", authRoute)
allRoutes.use("/laundry", laundryRoute)
allRoutes.use("/order", orderRoute)
allRoutes.use("/user", userRoute)
allRoutes.use("/services", serviceRoute)