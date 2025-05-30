const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const { verifyAccessToken } = require("../helpers/jwt");

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.post("/refresh", AuthController.RefreshToken);
router.post("/logout", AuthController.Logout);
router.get("/me", verifyAccessToken, AuthController.Me);

module.exports = router;