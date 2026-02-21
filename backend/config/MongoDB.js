require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("DEBUG URI:", process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000
});

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;