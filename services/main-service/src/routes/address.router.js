const express = require("express");
const addressRouter = express.Router();
const { getAddresses } = require("../controllers/address.controller");

addressRouter.get("/address/all", getAddresses);

module.exports = addressRouter;
