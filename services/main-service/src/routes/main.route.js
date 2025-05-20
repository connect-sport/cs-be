const express = require("express");
const router = express.Router();
const {
  getArticleByCategoryId,
  createArticleByCategoryId,
  updateArticleByCategoryId,
  deleteArticleByCategoryId,
} = require("../controllers/article.controller");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// API article
router.get("/article/:categoryId", getArticleByCategoryId);
router.post("/article/:categoryId", createArticleByCategoryId);
router.put("/article/:categoryId", updateArticleByCategoryId);
router.delete("/article/:categoryId", deleteArticleByCategoryId);

// API category
router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
