const {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu.controller");
const express = require("express");
const menuRouter = express.Router();

menuRouter.get("/menu/all", getMenus);
menuRouter.get("/menu/:id", getMenuById);
menuRouter.post("/menu", createMenu);
menuRouter.put("/menu/:id", updateMenu);
menuRouter.delete("/menu/:id", deleteMenu);

module.exports = menuRouter;
