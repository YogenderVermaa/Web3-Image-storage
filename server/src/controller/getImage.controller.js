import axios from "axios";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-errors.js";
import { decryptData } from "../utils/decryption.js";

const returnIpfsResponse = async (ipfsHash) => {
    const GATEWAY = "https://gateway.pinata.cloud/ipfs/";
    const res = await axios.get(`${GATEWAY}${ipfsHash}`, {
        responseType: "json"
    });

    return res.data;   // JSON: { encryptData: {data:[]}, iv:{data:[]} }
};

const getImage = asyncHandler(async (req, res) => {
    const userAddress = req.address;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    try {
        const user = await User.findOne({ userAddress });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const hashes = req.body; // ipfsHash[]

        if (!Array.isArray(hashes)) {
            throw new ApiError(400, "Body must contain array of hashes");
        }

        const start = (page - 1) * limit;
        const end = Math.min(hashes.length, page * limit);

        const selectedHashes = hashes.slice(start, end);

        const encryptedJsonArray = await Promise.all(
            selectedHashes.map((hash) => returnIpfsResponse(hash))
        );

        const decryptedImageArr = [];

        for (const img of encryptedJsonArray) {
            if (!img.encryptData || !img.iv) {
                throw new ApiError(500, "Corrupted IPFS file");
            }

            // convert JSON { type:'Buffer', data:[] } → real Buffer
            const encryptedBuffer = Buffer.from(img.encryptData.data);
            const ivBuffer = Buffer.from(img.iv.data);

            const decrypted = decryptData(
                encryptedBuffer,
                ivBuffer,
                user.encryptionKey
            );

            decryptedImageArr.push(decrypted.toString("base64"));
        }

        res.status(200).json(
            new ApiResponse(200, decryptedImageArr, "Image Sent")
        );

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error");
    }
});

export { getImage };
