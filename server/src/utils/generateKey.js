import crypto from "crypto";

const generateEncryptionKey = (length) => {
    return crypto.randomBytes(length)
}

export  {generateEncryptionKey}