require("module-alias/register");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

require("dotenv").config({
  path: process.env.NODE_ENV === "docker" ? ".env.docker" : ".env.local",
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Auth MongoDB connected"))
  .catch((err) => console.error("❌ Auth MongoDB error:", err));

// Routes
const mainRoutes = require("./routes/main.route");
app.use("/api/connect-sport/main", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🔐 Main service running on port ${process.env.PORT}`);
});
console.log(require("crypto").randomBytes(64).toString("hex"));
