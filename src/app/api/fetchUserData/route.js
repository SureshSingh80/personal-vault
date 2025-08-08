import { dbConnect } from "@/lib/dbConnect";
import KeyValue from "@/models/KeyValue";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request){
    
    try {
         await dbConnect();
        const {userId} = await request.json();
        // console.log("UserId= ",userId);

        // finding User KeyValue Data
        const keyValueData = await KeyValue.find({userId});

        if(keyValueData && keyValueData.length > 0){

                // decrypt all value fields
                keyValueData.forEach(item => {
                    const bytes = CryptoJS.AES.decrypt(item.value, process.env.ENCRYPTION_KEY);
                    item.value = bytes.toString(CryptoJS.enc.Utf8);
                });
                return NextResponse.json({data:keyValueData},{status:200});
        }
        
        return NextResponse.json({message:"No data found"},{status:200}); 
    } catch (error) {
        console.log("Error in fetching User keyValue Data");
        return NextResponse.json({message:"Error in fetching User keyValue Data"},{status:500});
    }
}