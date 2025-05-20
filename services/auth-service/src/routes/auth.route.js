const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth);

module.exports = router;
