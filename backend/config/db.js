import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${connection.connection.host}`);
      } catch (error) {
        console.error("Error during MongoDB connection:", error.message);
        process.exit(1);  // Exit with code 1 to indicate an error
      }
}

export default connectDb;