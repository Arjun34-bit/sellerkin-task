const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Database Connected".blue.bold);
  } catch (error) {
    console.error("Error", error);
    process.exit();
  }
};

module.exports = connectDB;
