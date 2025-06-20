import jwt from "jsonwebtoken";
import { google_auth_url, jwtConfig, CLIENT } from "@/config";
import { User } from "../models/User.js";
import { jwtUser } from "../utils/wrappers.js";
import { fetch_google_user, set_cookie } from "../utils/helpers.js";


/**Handles Google OAuth authentication*/
export async function googleAuth(req : import('express').Request, res:import('express').Response) {
    try {
        res.setHeader('Access-Control-Allow-Origin', CLIENT.origin); // Replace with your client's domain
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        const { code } = req.query;
        // if unable to find code in query
        if (!code) {
            res.status(401).json({ message: 'Invalid authentication', error: "code not found in query" });
            return;
        }

        const _user = await fetch_google_user(req);
        // if unable to find user from google Oauth api
        if (!_user) {
            res.status(401).json({ message: 'Invalid authentication' });
            return;
        }

        // if user already exists in database
        const _userExists = await User.findOne({ email: _user.email });
        if (_userExists) {
            _userExists.picture = _user.picture;
            _userExists.name = _user.name;
            _userExists.token = jwt.sign(jwtUser(_userExists), jwtConfig.secret);
            await _userExists.save();
            res.setHeader('token', _userExists.token);
            set_cookie(req, res, 'token', _userExists.token);
            return res.redirect(CLIENT.origin);
        }

        // if user does not exist in database
        const newUser = new User({ email: _user.email, picture: _user.picture, name: _user.name, role: "user" })
        const token = jwt.sign(jwtUser({ ...newUser.toObject() }), jwtConfig.secret);

        newUser.token = token;
        await newUser.save();
        set_cookie(req, res, 'token', newUser.token);
        res.redirect(CLIENT.origin);

    } catch (error : any) {
        return res.json(
            { code: 500, message: "server error", error: error.message || "" }
        );
    }
}

/**Handle login redirection to Google OAuth*/
export async function LogIn(req : import('express').Request , res : import('express').Response) {
    res.redirect(google_auth_url(req));
}


export async function authenticate(req : import('express').Request, res : import('express').Response) {
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
export async function logout(req : import('express').Request, res : import('express').Response) {
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