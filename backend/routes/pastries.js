import express from "express";
import {
  init,
  getPastriesReward,
  getPastriesWon,
  getAllPastries,
  getUserPastries,
} from "../controllers/PastriesController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Routes for pastries !");
});

// Pastries Routes
router.get("/init", init);
router.get("/getAllPastries", checkAuth, getAllPastries);
router.get("/getUserPastries", checkAuth, getUserPastries);
router.get("/getPastriesWon", getPastriesWon);
// router.get("/getPastriesWon", checkAuth, getPastriesWon);
router.post("/getPastriesReward", checkAuth, getPastriesReward);

export default router;
