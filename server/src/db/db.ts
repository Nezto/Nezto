import {connect} from "mongoose";
import {MONGO_URI} from "@/config"


const connectDB = async () => {
    try {
        const connectionIn = await connect(MONGO_URI)
        console.log("mongoDB connected",connectionIn.connection.host)
        // await setupDemoServices()
    } catch (error : any) {
        console.log("MongoDB Failed",error?.message)
        process.exit(1)
    }
}

export default connectDB;