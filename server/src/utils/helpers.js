import { google, jwtConfig, base_url } from "../config.js";
import jwt from "jsonwebtoken";

/**
 * Fetch user profile from Google OAuth API
 * @param {import('express').Request} req - grant callback code
 * @returns {Promise<import('./_types.js').GoogleUser>} User profile from Google OAuth API
 * @description
 * This function fetches user profile from Google OAuth API.
 */
export async function fetch_google_user(req) {
    try {
        const _payload = {
            code: req.query.code,
            client_id: google.client_id,
            client_secret: google.client_secret,
            redirect_uri: `${base_url(req)}/auth/google`,
            grant_type: 'authorization_code'
        }
        // fetching access token
        let _response = await fetch(google.token_url, {
            method: "POST",
            body: new URLSearchParams(_payload)
        })

        // contains access token
        const _json = await _response.json()

        // if unable to find access
        if (!_json.access_token) {
            console.error('OAuth token error:', _json.error_description || _json.error);
            return null;
        }
        // reusing the same response object to validate user profile
        _response = await fetch(`${google.user_profile}?access_token=${_json.access_token}`);

        // user profile data
        const _data = await _response.json();
        return _data;

    } catch (error) {
        console.error('OAuth token error:', error.response?.data || error.message);
        return null;
    }
}


/**
 * @description Get user token from request
 * @param {import('express').Request} req 
 * @returns {string | null} User token
 */
export function get_user_token(req) {
    try {
        if (!req.cookies.token && (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer'))) return null;
        return req.cookies.token || req.headers.authorization.split(' ')[1];
    } catch (error) {
        console.error('Error in get_user_token:', error.message);
        return null;
    }
}


/**
 * @description Generate JWT token
 * @param {String} token - User token from request 
 * @returns {import("./_types.js").JwtUser} JWT user
 */
export function verifyJWT(token) {
    try {
        return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
        return null;
    }
}


/**
 * Represents a standardized API response format.
 * @class
 * @classdesc A class for creating consistent API responses with status codes, data, messages, and optional error information.
 * @param {number} statusCode - HTTP status code of the response
 * @param {Object} data - The payload/data to be sent in the response
 * @param {string} message - A human-readable message describing the response
 * @param {*} [error=null] - Optional error information if there was an error
 * @property {boolean} success - Automatically determined based on status code (true if < 400)
 */
export class ApiResponse {
    /**
     * @description Class representing an API response.
     * @param {number} statusCode 
     * @param {Object} data 
     * @param {string} message 
     */
  constructor(statusCode, data, message, error=null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    if (error) {
      this.error = error;
    }
    this.success = statusCode < 400;
  }
}