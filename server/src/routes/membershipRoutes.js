import express from "express";
import { createMembership, getMemberships } from "../controllers/membershipController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getMemberships).post(createMembership);

export default router;
