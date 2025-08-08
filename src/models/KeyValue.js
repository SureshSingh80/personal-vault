import {models,model,Schema} from 'mongoose'

const keyValueSchema = new Schema({
    userId: {
       type:Schema.Types.ObjectId,
       ref: "Users",
       required: true  
    },
     key:{
        type:String,
        required:true
     },
     value:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now
     }
});

const KeyValue = models.KeyValue || model("KeyValue",keyValueSchema);
export default KeyValue;