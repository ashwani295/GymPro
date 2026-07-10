import express from "express";
import { getAttendance, markAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getAttendance).post(markAttendance);

export default router;
