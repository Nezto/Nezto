import { configDotenv } from "dotenv";
import { config_cache } from "@/utils/_cache";
configDotenv({path : ".env"});


export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
export const PORT = Number(process.env.PORT || 8000);
export const DEFAULT_COOKIE_EXPIRATION_MS = 24 * 60 * 60 * 1000 * 30; // 30 days in milliseconds
export const CLIENT = new URL(process.env.CLIENT_ENDPOINT || "http://localhost:3000")

export const jwtConfig = {
    secret: process.env.JWT_SECRET || "default_secret_key",
    expire: process.env.JWT_EXPIRE || "1d"
}

export const google = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    token_url: `https://oauth2.googleapis.com/token`,
    user_profile : "https://www.googleapis.com/oauth2/v3/userinfo",
    redirect_urls: ["/auth/google"],
}


export function base_url(req : import('express').Request) : string {
    let _base_url = config_cache.get("base_url")
    if(_base_url) return _base_url

    const protocol = req.hostname == "localhost" ? "http" : "https";
    _base_url = `${protocol}://${req.get('host')}`
    config_cache.set("base_url", _base_url)
    return _base_url
}


export function google_auth_url(req  :import('express').Request){
    let _auth_url = config_cache.get("google_auth_url")
    if(_auth_url) return _auth_url

    const protocol = req.hostname == "localhost" ? "http" : "https";
    _auth_url = `https://accounts.google.com/o/oauth2/auth?client_id=${google.client_id}&redirect_uri=${protocol}://${req.get('host')}/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`
    config_cache.set("google_auth_url", _auth_url)
    return _auth_url
}
