import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.log(`DB connection failed: ${error.message}`);
    process.exit(1);// 1 is faliure and 0 is success
  }
};
