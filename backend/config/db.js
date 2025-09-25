const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://qweetaadfg_db_user:Honey007@cluster0.whwbzje.mongodb.net/E-COMMERCE";
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
