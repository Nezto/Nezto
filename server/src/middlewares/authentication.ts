import { verifyJWT } from "@/utils/helpers";
import { LaundryOwnerCache } from "@/utils/_cache";




export function isOwner(req : import("express").Request, res : import("express").Response, next : Function){
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        const laundryID = req.params.id;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized", message: "No token provided" });
        }
        else if (!laundryID) {
            return res.status(400).json({ error: "Bad Request", message: "Laundry ID is required" });
        }

         // verify JWT token
         // if token is invalid or expired, it will return null
         // if token is valid, it will return user object
        const user = verifyJWT(token);
        if (!user) {
            return res.status(401).json({ message: "Forbidden" });
        }
        if (!LaundryOwnerCache.get(user._id)) {
            return res.status(403).json({ error : "Unauthorised", message: `You are not authorized to update this laundry service` });
        }
        next();
    }




/**
 * @description roleBased middleware for user authentication
 */
export function hasRole(role :string="user") : (req: import('express').Request, res: import('express').Response, next: Function) => void {
    /**
     * @description middleware for user authentication
     * @param {import('express').Request} req
     * @param {import("express").Response} res
     * @param {Function} next
     */
    return function (req : import('express').Request, res : import('express').Response, next : Function){
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
            return res.status(403).json({ error : "Unauthorised", message: `User doesn't have ${role} perm to access this resource!!` });
        }
        next();
    }
}