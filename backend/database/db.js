import mongoose from "mongoose";
import dotenv from "dotenv";

const Connection = () => {
  dotenv.config();
  const URL = process.env.MONGODB_URI;

  mongoose.connect(URL)
    .then(() => console.log("✅ Database Connected!"))
    .catch((err) => console.log("❌ Error connecting to DB:", err));
};

export default Connection;
