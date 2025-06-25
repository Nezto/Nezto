import { verifyJWT } from "@/utils/helpers";
import { Request, Response } from "express";
import { LaundryOwnerCache } from "@/utils/_cache";



export function isAuthenticated(req: Request, res: Response, next: Function): void {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        res.handler.unAuthorised(res, { message: "You are not authenticated" });
        return;
    }

    if (!req.app.nezto.jwts.has(token)){
        res.handler.unAuthorised(res);
        return;
    }

    const user = verifyJWT(token);
    if (!user) {
        res.handler.unAuthorised(res);
        return;
    }
    next();
}



export function isOwner(req: Request, res: Response, next: Function): void {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    const vendorID = req.params.id;
    const response = req.app.nezto.response;
    if (!token) {
        response.unAuthorised(res);
    }
    else if (!vendorID) {
        response.badRequest(res);
    }

    // verify JWT token
    // if token is invalid or expired, it will return null
    // if token is valid, it will return user object
    const user = verifyJWT(token);
    if (!user) {
        response.forbidden(res);
    }
    if (!LaundryOwnerCache.get(user?._id || "")) {
        response.forbidden(res, { message: `You are not authorized to update this vendor` });
    }
    next();
}





/**roleBased middleware for user authentication*/
export function hasRole(role: string = "user"): (req: Request, res: Response, next: Function) => void {
    return function (req: Request, res: Response, next: Function) {
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


export function isAdmin(req: Request, res: Response, next: Function): void {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    // verify JWT token
    // if token is invalid or expired, it will return null
    // if token is valid, it will return user object
    const user = verifyJWT(token);
    if (!user) {
        res.status(401).json({ message: "Forbidden" });
        return;
    }
    if (user.role !== "admin") {
        res.status(403).json({ error: "Unauthorised", message: `User doesn't have admin perm to access this resource!!` });
        return;
    }
    next();
}


export function hasAnyRole(roles: string[]): (req: Request, res: Response, next: Function) => void {
    return function (req: Request, res: Response, next: Function) {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
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
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Unauthorised", message: `User doesn't have permission to access this resource!!` });
        }
        next();
    }
}
