import { configDotenv } from "dotenv";
import { config_cache } from "./utils/_cache.js";
configDotenv({path : ".env"});


export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
export const PORT = process.env.PORT || 8000; 
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

export const origin = `localhost:${PORT}`;

export const client = {
    PORT: process.env.CLIENT_PORT || 3000,
    HOST: process.env.CLIENT_HOST || "localhost",
    ENDPOINT: process.env.CLIENT_ENDPOINT || "http://localhost:3000",
    ORIGIN: process.env.CLIENT_ORIGIN || "localhost:3000",
}


export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || "1d"
}

export const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}

export const google = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    token_url: `https://oauth2.googleapis.com/token`,
    user_profile : "https://www.googleapis.com/oauth2/v3/userinfo",
    redirect_urls: ["/auth/google"],
}

/**
 * 
 * @param {import('express').Request} req 
 */
export function base_url(req){
    let _base_url = config_cache.get("base_url")
    if(_base_url) return _base_url

    const protocol = req.hostname == "localhost" ? "http" : "https";
    _base_url = `${protocol}://${req.get('host')}`
    config_cache.set("base_url", _base_url)
    return _base_url
}

/**
 * 
 * @param {import('express').Request} req 
 * @returns {string} auth url   
 */
export function google_auth_url(req){
    let _auth_url = config_cache.get("google_auth_url")
    if(_auth_url) return _auth_url

    const protocol = req.hostname == "localhost" ? "http" : "https";
    _auth_url = `https://accounts.google.com/o/oauth2/auth?client_id=${google.client_id}&redirect_uri=${protocol}://${req.get('host')}/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`
    config_cache.set("google_auth_url", _auth_url)
    return _auth_url
}
