const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

categoryRouter.get("/category/all", getCategories);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.post("/category", createCategory);
categoryRouter.put("/category/:id", updateCategory);
categoryRouter.delete("/category/:id", deleteCategory);

module.exports = categoryRouter;
