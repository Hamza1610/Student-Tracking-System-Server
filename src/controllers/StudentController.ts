import Student from '../models/Student';
import { Request, Response } from 'express';

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    console.error('Error creating student:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
export const getStudentByUId = async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ uid: req.params.id });
    if (!student) res.status(201).json([]);
    res.status(200).json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) res.status(404).json({ error: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};