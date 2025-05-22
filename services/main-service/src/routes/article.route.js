const express = require("express");
const articleRouter = express.Router();
const {
  getArticlesByAlias,
  createArticleByAlias,
  updateArticleByAlias,
  deleteArticleByAlias,
} = require("../controllers/article.controller");

articleRouter.post("/article", getArticlesByAlias);
articleRouter.post("/article/:alias", createArticleByAlias);
articleRouter.put("/article/:alias", updateArticleByAlias);
articleRouter.delete("/article/:alias", deleteArticleByAlias);

module.exports = articleRouter;
