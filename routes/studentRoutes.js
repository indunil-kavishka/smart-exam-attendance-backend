import express from 'express';
import { createStudent, getStudents, getStudentByQR } from '../controllers/studentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, upload.single('photo'), createStudent)
  .get(protect, adminOnly, getStudents);

router.get('/scan/:qrData', protect, getStudentByQR);

export default router;