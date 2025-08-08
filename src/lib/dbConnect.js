import mongoose from "mongoose";

let isConnected = false;

export async  function dbConnect(){
     if(isConnected){
        console.log("Already connected to database");
        return;
     }
     else {
         try {
             await mongoose.connect(process.env.MONGODB_URI);
             console.log("Connected To MongoDB");
         } catch (error) {
            console.log("Error connecting to database: ",error);
         }
     }
}