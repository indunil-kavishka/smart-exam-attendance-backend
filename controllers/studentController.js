import Student from '../models/studentModel.js';

// @desc    Create new Student & Generate QR payload
// @route   POST /api/students
// @access  Private/Admin
export const createStudent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { studentId, name, faculty, degree, academicYear, semester, courses } = req.body;

    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    if (Number(semester) < 1) {
      return res.status(400).json({ message: 'Semester must be 1 or greater' });
    }

    let photoUrl = '';
    if (req.file) {
      photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    let parsedCourses = courses;
    if (typeof courses === 'string') {
      try {
        parsedCourses = JSON.parse(courses);
      } catch (err) {
        parsedCourses = [];
      }
    }

    const qrCodeData = `STUDENT_${studentId}`;

    const student = await Student.create({
      studentId,
      name,
      faculty,
      degree,
      academicYear,
      semester: Number(semester),
      photoUrl,
      courses: parsedCourses,
      qrCodeData,
    });

    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error); // View error in the terminal
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students for admin panel
// @route   GET /api/students
// @access  Private/Admin
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Student details by QR Code Data
// @route   GET /api/students/scan/:qrData
// @access  Private (Admin & Invigilator)
export const getStudentByQR = async (req, res) => {
  try {
    const { qrData } = req.params;
    const student = await Student.findOne({ qrCodeData: qrData });

    if (!student) {
      return res.status(404).json({ message: 'Invalid QR Code or Student Not Found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};