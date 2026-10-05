import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  isEligible: { type: Boolean, default: true },
});

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: [1, 'Semester cannot be negative or zero'],
    },
    photoUrl: {
      type: String,
      default: '',
    },
    courses: [courseSchema],
    qrCodeData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;