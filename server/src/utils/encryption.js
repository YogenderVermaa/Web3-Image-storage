import crypto from "crypto";

const encryptFile = (fileBuffer,encryptionKey) => {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv("aes-256-cbc",Buffer.from(encryptionKey),iv)


    const encryptData = Buffer.concat([cipher.update(fileBuffer),cipher.final()]);


    return {encryptData,iv}
}

export {encryptFile}