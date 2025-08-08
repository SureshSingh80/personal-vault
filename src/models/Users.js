import {model,Schema, models} from "mongoose";

const userSchema = new Schema({
    
    clerkId:{
        type: String,
        unique: true,
        required:true
    },
     username: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         required: true,
         unique:true
     },
     createdAt:{
        type:Date, 
        default:Date.now
     }
});

const Users = models.Users || model("Users",userSchema);
export default Users;
