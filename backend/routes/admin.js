import express from "express";
import {
  addPastry,
  adminlogin,
  deletePastrie,
  restorePastry,
} from "../controllers/AdminController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Routes for the admin !");
});

// Admin routes
router.post("/login", adminlogin);
router.post("/addPastry", checkAuth, addPastry);
router.get("/deletePastry/:id", checkAuth, deletePastrie);
router.get("/restorePastry/:id", checkAuth, restorePastry);

export default router;
