const express = require("express");
const http = require("http");
require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");

const app = express();
const server = http.createServer(app);
require("./socket")(server);

// Connect MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  console.log("🔗 Connecting to MongoDB:", MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const init = async () => {
  await connectDB();
  server.listen(process.env.PORT, () => {
    console.log("Server running on http://localhost:4000");
  });
};

init();
