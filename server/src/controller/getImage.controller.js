import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/api-response.js"
import pinataSDK from "@pinata/sdk";
import {generateEncryptionKey} from "../utils/generateKey.js"
import { ApiError } from "../utils/api-errors.js";
import { encryptFile } from "../utils/encryption.js";
import { decryptData } from "../utils/decryption.js";
const getImage = (asyncHandler(async(req,res) => {
    const userAddress = req.address

    const {page,limit} = req.query
    const pageNumber = parseInt(page) || 1
    const imageLimit = parseInt(limit) || 1
    

    if(pageNumber<1 || imageLimit <1){
        throw new ApiError(500,"Pegination issue")
    }
    const startIndex = (pageNumber-1)*imageLimit
    const endIndex =  pageNumber*imageLimit
    const ipfsHashArray = req.body.slice(startIndex,Math.min(req.body.length,endIndex))
   try {
    const user = await User.findOne({userAddress})
    if(!user){
      throw new  ApiError(500,"User dosen't exist")
    }

    

    res.status(200).json(new ApiResponse(200,null,"Image Sent"))
   }catch(error){
    console.log(error)
    throw new ApiError(500,"Internal Server Error")
    
   }







}))
export  {
    getImage
}