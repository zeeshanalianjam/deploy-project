import mongoose from 'mongoose'
import {DB_Name} from "../constants.js"

export const DBConnect = async ()=> {
    try {
      const connecionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
      console.log(`\n DB Connected Successfully! || DB Connection Host : ${connecionInstance.connection.host}`);
      
    } catch (error) {
        console.log(`DB Connection Faild! || ERROR : ${error}`);
        process.exit(1)
    }
}