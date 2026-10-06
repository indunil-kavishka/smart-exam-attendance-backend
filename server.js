import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // path import
import dns from 'node:dns';
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Get __dirname in ES modules
const __dirname = path.resolve();

// Serve uploads folder statically (required for loading images from the frontend)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Smart Attendance System API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});