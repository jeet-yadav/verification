import experss from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = experss();
const PORT = process.env.PORT || 3000;

app.use(experss.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT} ✅`);
});
