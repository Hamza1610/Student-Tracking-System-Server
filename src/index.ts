import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import cors from 'cors';
import studentRoutes from './routes/StudentRoutes';
import notificationRoutes from './routes/NotificationRoutes';
import parentRoutes from './routes/ParentRoutes';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI || '', {
        // Removed deprecated options
    })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: any) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Student Tracking System API');
});

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/parents', parentRoutes);
