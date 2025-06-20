import {connect} from "mongoose";
import {MONGO_URI} from "../config.js"
import { setupDemoServices } from "../demo_setup.js"


const connectDB = async () => {
    try {
        const connectionIn = await connect(MONGO_URI)
        console.log("mongoDB connected",connectionIn.connection.host)
        await setupDemoServices()
    } catch (error) {
        console.log("MongoDB Failed",error?.message)
        process.exit(1)
    }
}

export default connectDB;