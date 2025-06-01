import { log } from 'console';
import Parent from '../models/Parent';
import Student, { IStudent } from '../models/Student';
import { Request, Response } from 'express';

// Create a new parent
export const createParent = async (req: Request, res: Response) => {
  try {
    console.log("Creating parent with data:", req.body);
    
    // Check if email exists in Parent collection
    const existingParent = await Parent.findOne({ email: req.body.email });
    if (existingParent) {
      return res.status(400).json({ 
        error: 'Email already registered as a parent' 
      });
    }

    // Check if email exists in Student collection
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ 
        error: 'Email already registered as a student' 
      });
    }
    
    const parent = await Parent.create(req.body);
    console.log("Parent created:", parent);
    res.status(201).json(parent);
  } catch (error: any) {
    console.error("Error creating parent:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all parents
export const getParents = async (_req: Request, res: Response) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single parent by ID
export const getParentByUId = async (req: Request, res: Response) => {
  try {
    console.log("Fetching parent with ID:", req.params.id);

    const parent = await Parent.findOne({uid: req.params.id});
    if (!parent) res.status(201).json({ error: 'Parent not found' });

    console.log("Parent fetched:", parent);
    res.status(200).json(parent);
  } catch (error: any) {
    console.error("Error fetching parent:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a parent by ID
export const updateParent = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) res.status(404).json({ error: 'Parent not found' });
    res.status(200).json(parent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateParentStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    }

    console.log('Student found:', student);

    const studentToAdd = {
      _id: student._id,
      uid: student.uid,
      name: student.name,
      email: student.email,
      role: student.role,
      location: {
        latitude: student.location.latitude,
        longitude: student.location.longitude,
      }
    };

    // Directly update the parent without fetching it first
    const updatedParent = await Parent.findOneAndUpdate(
      { uid: req.params.id },
      { $addToSet: { students: studentToAdd } }, // $addToSet prevents duplicates
      { new: true } // Return the updated document
    );

    if (!updatedParent) {
      res.status(404).json({ error: 'Parent not found' });
    }

    console.log('Parent updated:', updatedParent);

    res.status(200).json(updatedParent);
  } catch (error: any) {
    console.error('Error updating parent:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a parent by ID
export const deleteParent = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) res.status(404).json({ error: 'Parent not found' });
    res.status(200).json({ message: 'Parent deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};