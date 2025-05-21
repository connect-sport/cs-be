const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    alias: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
