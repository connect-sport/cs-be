require("module-alias/register");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("dotenv").config({
  path: process.env.NODE_ENV === "docker" ? ".env.docker" : ".env.local",
});

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Auth MongoDB connected"))
  .catch((err) => console.error("❌ Auth MongoDB error:", err));

// Routes
const authRoutes = require("./routes/auth.route");
app.use("/api/connect-sport/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🔐 Auth service running on port ${process.env.PORT}`);
});
