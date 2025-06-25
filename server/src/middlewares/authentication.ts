import { verifyJWT, set_cookie } from "@/utils/helpers";
import { Request, Response } from "express";


/**
 * Middleware to check if the incoming request is authenticated.
 *
 * This function verifies the presence and validity of a JWT token in the request's cookies or
 * Authorization header. It also checks if the token exists in the application's JWT store.
 * If authentication fails at any step, it responds with an unauthorized error.
 * Otherwise, it calls the next middleware in the stack.
 */
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
    res.setHeader('X-User-Id', String(user._id));
    next();
}



/**
 * Middleware to check if the authenticated user is the owner of the specified vendor.
 *
 * This function performs the following checks:
 * 1. Extracts the JWT token from cookies or the Authorization header.
 * 2. Retrieves the vendor ID from the request parameters.
 * 3. Returns an unauthorized response if the token is missing.
 * 4. Returns a bad request response if the vendor ID is missing.
 * 5. Verifies the JWT token and retrieves the user object.
 * 6. Returns a forbidden response if the token is invalid, expired, or the user is not found.
 * 7. Checks if the user exists in the LaundryOwnerCache.
 * 8. Returns a forbidden response if the user is not authorized to update the vendor.
 * 9. Calls the next middleware if all checks pass.
 */
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
    if (!req.app.nezto.vendors.get(user?._id || "")) {
        response.forbidden(res, { message: `You are not authorized to update this vendor` });
    }
    next();
}



export  function hasRole(role = "user"): (req: Request, res: Response, next: Function) => void {
    return async function (req: Request, res: Response, next: Function) {
        const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // verify JWT token
        // if token is invalid or expired, it will return null
        // if token is valid, it will return user object
        const user = verifyJWT(token);

        if (!user) {
            console.log("User not found or token is invalid");
            return res.status(401).json({ message: "Forbidden" });
        }
        
        const userCache = await req.app.nezto.users.get(user._id);
        if (!userCache?.roles.includes(role)) {
            return res.status(403).json({ error: "Unauthorised", message: `User doesn't have ${role} perm to access this resource!!` });
        }
        set_cookie(req, res, 'token', userCache.token || "invalid token");
        set_cookie(req, res, '_id', String(userCache._id || "invalid id"));
        res.setHeader('X-User-Id', String(userCache._id));
        next();
    }
}


export async function isAdmin(req: Request, res: Response, next: Function) {
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
    const userCache = await req.app.nezto.users.get(user._id);
    console.log("User Cache:", userCache);
    if (!userCache?.roles.includes("admin")) {
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
