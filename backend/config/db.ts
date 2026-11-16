import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spendwise";

  // If using a cloud database (Atlas, etc.), connect directly
  if (uri.startsWith("mongodb+srv://")) {
    try {
      await mongoose.connect(uri);
      console.log(`🟢 Connected to MongoDB Atlas!`);
      return;
    } catch (error) {
      console.log("❌ Error connecting to MongoDB Atlas:", error);
      process.exit(1);
    }
  }

  // Otherwise, try local MongoDB with a 2-second timeout
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`🟢 Connected to local MongoDB!`);
    return;
  } catch (localErr) {
    console.log("⚠️ Local MongoDB not active. Starting embedded In-Memory MongoDB for development...");
  }

  // Fallback: Embedded In-Memory MongoDB (Zero-setup development mode)
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    await mongoose.connect(memoryUri);
    console.log(`🟢 Connected to In-Memory MongoDB at ${memoryUri}!`);
    console.log(`🚀 Database ready for authentication and expense tracking!`);
  } catch (error) {
    console.log("❌ Failed to start In-Memory MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
