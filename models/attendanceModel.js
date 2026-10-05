import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Invigilator who marked the attendance
      required: true,
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT'],
      default: 'PRESENT',
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;