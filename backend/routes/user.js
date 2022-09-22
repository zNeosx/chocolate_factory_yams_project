import express from "express";
import { login, logout, register } from "../controllers/UserController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", checkAuth, logout);

export default router;
