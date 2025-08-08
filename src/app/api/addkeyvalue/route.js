import { dbConnect } from "@/lib/dbConnect";
import KeyValue from "@/models/KeyValue";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request){
    try {
        await dbConnect();
        const {key,value,userCredentials} = await request.json();
        console.log("key= ",key," value= ",value," userCredentials= ",userCredentials);

        // encrypt value before saving in database using crypto-js
        const encryptedValue = CryptoJS.AES.encrypt(value, process.env.ENCRYPTION_KEY).toString();
        console.log("encryptedValue= ",encryptedValue);
              

        // Validate fields
        if (!userCredentials?._id) {
          return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        const keyValue = await KeyValue.create({userId:userCredentials._id,key,value:encryptedValue});
        return NextResponse.json({data:keyValue},{status:200});
    } catch (error) {
        console.log("Error in adding key value in API: ",error);
        return NextResponse.json({message:"Error in adding key value in API"},{status:500});
    }
}