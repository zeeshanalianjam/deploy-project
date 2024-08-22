
import dotenv from 'dotenv'
import { DBConnect } from './db/index.js'
import { app } from './app.js';



// dotenv configuration
dotenv.config({
    path: "./.env"
})


DBConnect().then(()=>{
    console.log(`MONGO_DB Connected Successfully...`);

    app.on("Error", (error)=>{
        console.log(`Something Went Wrong! ${error}`);
        
    })

    app.listen(process.env.PORT,()=> {
        console.log(`Server is Running on Port : ${process.env.PORT}`);
    })
    
}).catch((error)=> {
    console.log(`MONGO_DB Server ERRROR : ${error}`);
    
})