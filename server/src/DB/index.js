import mongoose from "mongoose"

const connectDB = async () => {

    try {
        const mongodbInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(mongodbInstance.connection.name)
        console.log("Mongodb Connected >>>")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }


}


export default connectDB