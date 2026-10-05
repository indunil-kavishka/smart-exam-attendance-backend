import express from 'express';
import { markAttendance, getAttendanceLogs } from '../controllers/attendanceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Any logged-in invigilator or admin can mark attendance
router.post('/mark', protect, markAttendance);

// Admin can view all real-time attendance records
router.get('/', protect, adminOnly, getAttendanceLogs);

export default router;