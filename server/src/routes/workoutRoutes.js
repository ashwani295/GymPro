import express from "express";
import { createWorkoutPlan, getWorkoutPlans } from "../controllers/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getWorkoutPlans).post(createWorkoutPlan);

export default router;
