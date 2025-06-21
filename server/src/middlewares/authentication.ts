import { verifyJWT } from "@/utils/helpers";
import { Request, Response } from "express";
import { LaundryOwnerCache } from "@/utils/_cache";


export function isOwner(req: Request, res: Response, next: Function): void {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    const vendorID = req.params.id;
    if (!token) {
        res.status(401).json({ error: "Unauthorized", message: "No token provided" });
    }
    else if (!vendorID) {
        res.status(400).json({ error: "Bad Request", message: "Vendor ID is required" });
    }

    // verify JWT token
    // if token is invalid or expired, it will return null
    // if token is valid, it will return user object
    const user = verifyJWT(token);
    if (!user) {
        res.status(401).json({ message: "Forbidden" });
    }
    if (!LaundryOwnerCache.get(user?._id || "")) {
        res.status(403).json({ error: "Unauthorised", message: `You are not authorized to update this vendor` });
    }
    next();
}




/**
 * @description roleBased middleware for user authentication
 */
export function hasRole(role: string = "user"): (req: import('express').Request, res: import('express').Response, next: Function) => void {
    /**
     * @description middleware for user authentication
     * @param {import('express').Request} req
     * @param {import("express").Response} res
     * @param {Function} next
     */
    return function (req: import('express').Request, res: import('express').Response, next: Function) {
        const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // verify JWT token
        // if token is invalid or expired, it will return null
        // if token is valid, it will return user object
        const user = verifyJWT(token);
        if (!user) {
            return res.status(401).json({ message: "Forbidden" });
        }
        if (user.role !== role) {
            return res.status(403).json({ error: "Unauthorised", message: `User doesn't have ${role} perm to access this resource!!` });
        }
        next();
    }
}