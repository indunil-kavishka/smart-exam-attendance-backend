import Attendance from '../models/attendanceModel.js';
import Student from '../models/studentModel.js';

// @desc    Mark attendance for a subject
// @route   POST /api/attendance/mark
// @access  Private (Invigilator / Admin)
export const markAttendance = async (req, res) => {
  try {
    const { studentId, courseCode } = req.body;

    // Check if student exists
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student is eligible for the subject
    const course = student.courses.find((c) => c.courseCode === courseCode);
    if (!course) {
      return res.status(400).json({ message: 'Course not found for this student' });
    }

    if (!course.isEligible) {
      return res.status(403).json({ message: 'Student is NOT ELIGIBLE for this exam' });
    }

    // Check if attendance is already marked
    const existingAttendance = await Attendance.findOne({
      studentId,
      courseCode,
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for this subject' });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      student: student._id,
      studentId,
      courseCode,
      markedBy: req.user._id,
      status: 'PRESENT',
    });

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get real-time attendance logs for Student Affairs Admin
// @route   GET /api/attendance
// @access  Private (Admin)
export const getAttendanceLogs = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('student', 'name photoUrl semester faculty degree') // populate faculty and degree
      .populate('markedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};