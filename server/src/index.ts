import {PORT} from "@/config"
import connectDB from '@/db/db'
import { server } from "@/socket/socket";



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