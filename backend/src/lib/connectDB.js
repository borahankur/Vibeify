import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to Mongo DB: ${connection.connection.host}`)
    }
    catch (error) {
        console.log("Failed to connect to MongoDB", error)
        process.exit(1)
    }
}
