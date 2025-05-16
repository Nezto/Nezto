import { configDotenv } from "dotenv";
configDotenv({path : ".env"});


export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
export const PORT = process.env.PORT || 8000; //prefer 8000 for now
export const origin = "http://localhost:"+ PORT;
export const CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT || "http://localhost:3000";

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
    redirect_uris: ["/auth/google"],
}


/** 
* @param {import('express').Request} req - Express request object
* @returns {string} Google OAuth URL
*/
export function google_auth_url(req){
    const protocol = req.get('scheme') || req.protocol;
    return `https://accounts.google.com/o/oauth2/auth?client_id=${google.client_id}&redirect_uri=${protocol}://${req.get('host')}/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`
}
