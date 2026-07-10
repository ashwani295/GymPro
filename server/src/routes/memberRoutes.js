import express from "express";
import { assignTrainer, createMember, getMembers } from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getMembers).post(createMember);
router.patch("/:id/assign-trainer", assignTrainer);

export default router;
