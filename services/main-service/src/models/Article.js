const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    levels: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
