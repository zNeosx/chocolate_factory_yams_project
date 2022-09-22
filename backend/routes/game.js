import express from "express";
import { getCombination } from "../controllers/GameController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Routes for the game !");
});

// Game Routes
router.get("/getCombination", checkAuth, getCombination);
export default router;
