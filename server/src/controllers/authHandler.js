import jwt from "jsonwebtoken";
import { google_auth_url, jwtConfig, client } from "../config.js";
import { User } from "../models/User.js";
import { jwtUser } from "../utils/wrappers.js";
import { fetch_google_user } from "../utils/helpers.js";


/**
 * Handles Google OAuth authentication
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves when authentication is complete
 * @description
 * Expected request query:
 * - code: Google OAuth token
 */
export async function googleAuth(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', client.ENDPOINT); // Replace with your client's domain
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
        }          // if user already exists in database
        const _userExists = await User.findOne({ email: _user.email });
        if (_userExists) {
            _userExists.picture = _user.picture;
            _userExists.name = _user.name;
            _userExists.token = jwt.sign(jwtUser(_userExists), jwtConfig.secret);
            await _userExists.save();
            res.setHeader('token', _userExists.token);
            res.cookie('token', _userExists.token, 
                { 
                    expires: new Date(Date.now() + 3150000), 
                    httpOnly: true, 
                    secure: true, 
                    domain: client.ORIGIN,
                    sameSite: 'none' 
                }
            );
            return res.redirect(client.ENDPOINT);
        }

        // if user does not exist in database
        const newUser = new User({ email: _user.email, picture: _user.picture, name: _user.name, role: "user" })
        const token = jwt.sign(jwtUser({...newUser.toObject()}), jwtConfig.secret);

        newUser.token = token;
        await newUser.save();
        res.cookie('token', newUser.token, { expires: new Date(Date.now() + 3150000), httpOnly: true, secure: true, sameSite: 'none' });
        res.redirect(client.ENDPOINT);

    } catch (error) {
        return res.json(
            { code: 500, message: "server error", error: error.message || "" }
        );
    }
}

/**
 * Handle login redirection to Google OAuth
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export async function LogIn(req, res) {
    res.redirect(google_auth_url(req));
}


export async function authenticate(req, res) {
    try {
        if (req.cookies.token == null) {
            if (!req.headers.authorization || !`${req.headers.authorization}`.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Invalid authentication' });
                return;
            }
        }
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        const _user = jwt.verify(token, jwtConfig.secret);
        res.status(200).json(_user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication', error: error.message || "" });
    }
}



export async function logout(req, res) {
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
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message || "" });
    }
}