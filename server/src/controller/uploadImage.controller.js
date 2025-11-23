import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/api-response.js"
import pinataSDK from "@pinata/sdk";
import {generateEncryptionKey} from "../utils/generateKey.js"
import { ApiError } from "../utils/api-errors.js";
import { encryptFile } from "../utils/encryption.js";

const uploadImageController = asyncHandler(async(req,res,next) => {
  const userAddress = req.address
  console.log("userAddress::::::",userAddress)
   try {
    const user = await User.findOne({userAddress})
    if(!user){
      throw new ApiError(500,"User dosen't exist")
    }

    if(user.encryptionKey === null){
      const encryptionKey  = generateEncryptionKey(32)
      user.encryptionKey = encryptionKey
      await user.save()
    }


    const {encryptData,iv} = encryptFile(req.file.buffer,user.encryptionKey)
     const pinata = new pinataSDK(process.env.PINATA_API_KEY,process.env.PINATA_SECRET_KEY)
     const resPinata = await pinata.pinJSONToIPFS({encryptData,iv})
     
     res.status(200).json(new ApiResponse(200,{ipfsHash:resPinata.IpfsHash,iv},"uploadSuccess"))
   } catch (error) {
     console.log(error)
     throw new ApiError(500,"Something Went Wrong While Uploading The File")
   }
})

export  {
    uploadImageController
}