import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { jwtUser } from "@utils/wrappers";
import { Request, Response } from "express";
import { UserRoles } from "@/utils/constants";
import { google_auth_url, jwtConfig, CLIENT } from "@/config";
import { fetch_google_user, set_cookie } from "@utils/helpers";




/**Handles Google OAuth authentication*/
export async function googleAuth(req : Request, res : Response) : Promise<void>{
    try {
        const { code } = req.query;
        
        // if unable to find code in query
        if (!code) {
            res.status(401).json({ message: 'Invalid authentication', error: "code not found in query" });
            return;
        }

        // fetching user from google Oauth api
        
        const googleUser = await fetch_google_user(req);

        // if unable to find user from google Oauth api
        if (!googleUser) {
            res.status(401).json({ message: 'Invalid authentication' });
            return;
        }

        // if user already exists in database
        const existingUser = await User.findOne({ email: googleUser?.email });
        if (existingUser) {
            existingUser.avatar = googleUser.picture;
            existingUser.name = googleUser.name;
            existingUser.token = jwt.sign(jwtUser(existingUser), jwtConfig.secret);
            await existingUser.save();
            set_cookie(req, res, 'token', existingUser.token);
            res.redirect(CLIENT.origin);
            return;
        }

        // if user does not exist in database
        const newUser = new User({ email: googleUser.email, avatar: googleUser.picture, name: googleUser.name, role: UserRoles.user })
        const token = jwt.sign(jwtUser({ ...newUser.toObject() }), jwtConfig.secret);

        newUser.token = token;
        await newUser.save();
        set_cookie(req, res, 'token', newUser.token);
        res.redirect(CLIENT.origin);
        return;
    } 
    
    catch (error : any) {
        res.status(500).json(
            { code: 500, message: "server error", error: error.message || "" }
        );
    }
}




/**Handle login redirection to Google OAuth*/
export async function LogIn(req : Request, res : Response) {
    res.redirect(google_auth_url(req));
}


export async function authenticate(req : Request, res : Response) {
    try {
        if (req.cookies.token == null) {
            if (!req.headers.authorization || !`${req.headers.authorization}`.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Invalid authentication' });
                return;
            }
        }
        const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];
        const _user = jwt.verify(token, jwtConfig.secret);
        res.status(200).json(_user);

    } catch (error : any) {
        res.status(401).json({ message: 'Invalid authentication', error: error.message || "" });
    }
}


/** clears cookie, reset user token */
export async function logout(req : Request, res : Response) {
    try {
        // logout from all devices
        if (req.query.all) {
            res.clearCookie('token');
            // logout from all devices
            await User.updateOne({ token: req.cookies.token }, { token: '' });
            res.status(200).json({ message: 'logged out from all devices' });
            return;
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'logged out' });
    } 
    
    catch (error : any) {
        res.status(500).json({ message: 'server error', error: error.message || "" });
    }
}