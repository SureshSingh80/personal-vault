import { dbConnect } from "@/lib/dbConnect";
import KeyValue from "@/models/KeyValue";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
export async function POST(request){
    try {
        await dbConnect();
        const {newKey,newValue,userCredentials,_id} = await request.json();
        // console.log("newkey= ",newKey," newValue= ",newValue," userCredentials= ",userCredentials,"_id=",_id);

        // Validate fields
        if (!userCredentials?._id || !_id) {
          return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // encrypt value before saving in database using crypto-js
                const encryptedValue = CryptoJS.AES.encrypt(newValue, process.env.ENCRYPTION_KEY).toString();
                // console.log("encryptedValue= ",encryptedValue);

        // edit based on userID and key
        const keyValue = await KeyValue.findOneAndUpdate({userId:userCredentials._id,_id:_id},{key:newKey,value:encryptedValue},{new:true});
        return NextResponse.json({data:keyValue},{status:200});
    
    } catch (error) {
        console.log("Error in adding key value in API: ",error);
        return NextResponse.json({message:"Error in adding key value in API"},{status:500});
    }
}