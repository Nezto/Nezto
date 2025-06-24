import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JwtUser, GoogleUser } from "./_types";
import { google, jwtConfig, base_url, CLIENT, DEFAULT_COOKIE_EXPIRATION_MS } from "@/config";


interface JsonResponse {
    access_token?: string;
    statusCode: number;
    data: any;
    message: string;
    error?: any;
    error_description?: string;
}


/**
 * @description Fetch Google user profile using OAuth2
 */
export async function fetch_google_user(req : Request) : Promise<GoogleUser | null> {
    try {
        const _payload : Record<string, any> = {
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
        const _json: any = await _response.json()

        // if unable to find access
        if (!_json.access_token) {
            console.error('OAuth token error:', _json.error_description || _json.error);
            return null;
        }
        // reusing the same response object to validate user profile
        _response = await fetch(`${google.user_profile}?access_token=${_json.access_token}`);

        // user profile data
        const _data = await _response.json();
        return new GoogleUser(_data || {});

    } catch (error : any) {
        console.error('OAuth token error:', error.response?.data || error.message);
        return null;
    }
}


/**
 * @description Get user token from request
 */
export function get_user_token(req : Request) : string | null {
    try {
        if (!req.cookies.token && (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer'))) return null;
        return req.cookies.token || req.headers?.authorization?.split(' ')[1];
    } catch (error : any) {
        console.error('Error in get_user_token:', error.message);
        return null;
    }
}


/**
 * @description Generate JWT token
 */
export function verifyJWT(token : string) : JwtUser | null {
    try {
        return new JwtUser(jwt.verify(token, jwtConfig.secret || "default"));
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

    statusCode: number;
    data: any;
    message: string;
    error: any | null = null;
    success: boolean;

    /**
     * @description Class representing an API response.
     */
  constructor(statusCode : number, data: any, message: string, error: any = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;

    if (error) {
      this.error = error;
    }
    this.success = statusCode < 400;
  }
}


/**@description Set cookie in response*/
export function set_cookie(
    req : Request, 
    res : Response, 
    key : string, 
    value : string, 
    domain=CLIENT.hostname, 
    time=DEFAULT_COOKIE_EXPIRATION_MS, 
    secure=true
) {
    res.cookie(key, value, { 
        expires: new Date(Date.now() + time), 
        httpOnly: true, 
        secure: secure, 
        domain: domain || req.hostname,
        sameSite: 'none' 
    });
}