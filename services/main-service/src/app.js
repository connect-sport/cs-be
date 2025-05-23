require("module-alias/register");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const { MONGO_URI, HOST, PORT, HOST_PORT } = require("./config/config");

dotenv.config();

require("dotenv").config({
  path: process.env.NODE_ENV === "docker" ? "./.env.docker" : "./.env.local",
});

const app = express();

app.use(
  cors({
    origin: `${HOST}:${HOST_PORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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

// Routes
const articleRoutes = require("./routes/article.route");
const categoryRoutes = require("./routes/category.route");
const menuRoutes = require("./routes/menu.route");
const Address = require("./models/Address");
const addressRouter = require("./routes/address.router");

app.use("/api/connect-sport/main", articleRoutes);
app.use("/api/connect-sport/main", categoryRoutes);
app.use("/api/connect-sport/main", menuRoutes);
app.use("/api/connect-sport", addressRouter);

console.log(require("crypto").randomBytes(64).toString("hex"));

const seedAddressFromFile = async () => {
  const filePath = path.join(__dirname, "./data/districts.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(jsonData);

  const count = await Address.countDocuments();
  if (count === 0) {
    await Address.insertMany(articles);
    console.log("✅ Articles inserted from JSON");
  } else {
    console.log("ℹ️ Articles already exist, skipping.");
  }
};

const init = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🔐 Main service running on port ${PORT}`);
  });
  await seedAddressFromFile();
};

init();
