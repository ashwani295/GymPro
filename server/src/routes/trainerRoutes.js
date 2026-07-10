import express from "express";
import { createTrainer, getTrainers } from "../controllers/trainerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getTrainers).post(createTrainer);

export default router;
