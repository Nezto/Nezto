import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { allRoutes } from "./routes/router.js"
import { CLIENT } from "./config.js"


const app = express()

app.use(cors({
  origin: CLIENT.origin, 
  credentials: true // Crucial if your frontend sends cookies or auth tokens
}));


app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

// mounted all routes 
app.use("/", allRoutes)
export { app }