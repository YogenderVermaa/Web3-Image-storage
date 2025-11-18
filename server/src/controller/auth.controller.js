import {ethers} from "ethers"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.model.js";


const authController = asyncHandler(async(req,res) => {
    const {signature} = req.body;
    const {address} = req.query
    if(!signature){
        throw new ApiError(401,"Signature is invalid")
    }

    const recoverAddress =  ethers.utils.verifyMessage("Welcome to crypto wallet",signature)
    if(!recoverAddress){
        throw new ApiError(500,"Recovered address not found")
    }  
    if(address.toLowerCase() === recoverAddress.toLowerCase()){
          res.status(200).json(new ApiResponse(200,"Authentication Successfull"))
    }else{
        res.status(400).json(new ApiResponse("Authentication Failed"))
    }
    
    const Address = recoverAddress.toLowerCase()
    
    const user = await User.findOne({userAddress:Address})

    if(!user){
        const userData = await User.create({
            userAddress:Address
        })
    }

})


export {authController}