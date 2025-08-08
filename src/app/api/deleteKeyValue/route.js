import { dbConnect } from "@/lib/dbConnect";
import KeyValue from "@/models/KeyValue";
import { NextResponse } from "next/server";

export async function DELETE(request){
     try {
        await dbConnect();
        const {userCredentials,_id} = await request.json();
        // console.log("userCredentials= ",userCredentials," _id= ",_id);
        
            // Validate fields
            if (!userCredentials?._id || !_id) {
              return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
            }

        const keyValue = await KeyValue.findOneAndDelete({userId:userCredentials._id,_id:_id});
         return NextResponse.json({data:keyValue},{status:200});

     } catch (error) {
        console.log("Error in deleting key value in API: ",error);
        return NextResponse.json({message:"Error in deleting key value in API"},{status:500});
     }
}