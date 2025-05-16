import {PORT} from "./src/config.js"
import connectDB from './src/db/db.js'
// import { app } from "./src/app.js"
import { server } from "./src/socket/socket.js";



async function main(){
    try{
        await connectDB();
        server.listen(PORT, ()=>{
            console.log(`Server Running On Port : ${PORT}`);
        })
    }catch(err){
        console.error(err);
    }
}

main();