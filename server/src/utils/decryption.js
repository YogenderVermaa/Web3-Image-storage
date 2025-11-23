import crypto from "crypto";
import { ApiError } from "./api-errors";

const decryptData = (encryptData,iv,encryptionKey) => {
    try {
        if(typeof iv === 'object' && iv.type === 'Buffer' && Array.isArray(iv.data)){
            iv = Buffer.from(iv.data)
        }
        if(typeof encryptData === 'object' && encryptData.type === 'Buffer' && Array.isArray(encryptData.data)){
            encryptData = Buffer.from(encryptData.data)
        }

        const decipher  = crypto.createDecipheriv('aes-256-cbc',Buffer.from(encryptionKey),iv);
        const decryptData = Buffer.concat([decipher.update(encryptData)],decipher.final())
        return decryptData;
    } catch (error) {
        throw new ApiError(500,"Error in Data Decrition")
    }
}

export {decryptData}