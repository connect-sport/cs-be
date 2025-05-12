const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

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
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🔐 Auth service running on port ${process.env.PORT}`);
});
