import express from "express";
import { createProgress, getProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getProgress).post(createProgress);

export default router;
