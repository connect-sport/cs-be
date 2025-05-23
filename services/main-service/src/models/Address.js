const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    label: { type: String },
    value: { type: String },
    palace: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
