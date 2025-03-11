import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://fayfayis74:fayfayis7227@urlshortner.57uau.mongodb.net/?retryWrites=true&w=majority&appName=urlshortner", );
    console.log("MongoDB Connected here");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
