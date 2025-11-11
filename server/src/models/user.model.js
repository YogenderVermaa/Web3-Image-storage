import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userAddress:{
        type:"string",
        required:true
    },
    encryptionKey:{
        type:Buffer,
        default:null
    }
},
{
    timestamps:true
})


export const User = await mongoose.model("User",userSchema)


