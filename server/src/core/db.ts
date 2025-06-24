import {connect} from "mongoose";
import {MONGO_URI} from "@/config"
import { Logger } from "@/utils/logger";

const connectDB = async () => {
    try {
        const connectionIn = await connect(MONGO_URI, {
            dbName: "NeztoDB", // Specify the database name
            autoIndex: true, // Add this line to enable autoIndex
            serverSelectionTimeoutMS: 5000, // Optional: Adjust the timeout for server selection
            socketTimeoutMS: 45000, // Optional: Adjust the socket timeout
        })
        Logger.info(`DB Connected: ${connectionIn.connection.host}:${connectionIn.connection.port}`);
        // await setupDemoServices()
    } catch (error : any) {
        Logger.error(`MongoDB Failed: ${error?.message}`);
        process.exit(1);
    }
}

export default connectDB;