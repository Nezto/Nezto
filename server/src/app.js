import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { allRoutes } from "./routes/router.js"
import { client } from "./config.js"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || client.ENDPOINT || "http://localhost:3000",
    credentials: true
}))


app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

// mounted all routes 
app.use("/", allRoutes)
export { app }