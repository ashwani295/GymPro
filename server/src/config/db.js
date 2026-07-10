import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gympro";

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error("Check that MongoDB is running locally or update MONGO_URI in server/.env.");
    process.exit(1);
  }
}
