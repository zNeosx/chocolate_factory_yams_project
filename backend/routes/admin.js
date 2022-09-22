import express from "express";
import {
  addPastry,
  adminlogin,
  deletePastrie,
} from "../controllers/AdminController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Routes for the admin !");
});

// Admin routes
router.post("/login", adminlogin);
router.post("/addPastry", checkAuth, addPastry);
router.delete("/deletePastry/:id", checkAuth, deletePastrie);

export default router;
