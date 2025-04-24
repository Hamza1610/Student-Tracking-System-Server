import Parent from '../models/Parent';
import { Request, Response } from 'express';

// Create a new parent
export const createParent = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.create(req.body);
    res.status(201).json(parent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all parents
export const getParents = async (_req: Request, res: Response) => {
  try {
    const parents = await Parent.find().populate('students');
    res.status(200).json(parents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single parent by ID
export const getParentById = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('students');
    if (!parent) res.status(404).json({ error: 'Parent not found' });
    res.status(200).json(parent);
  } catch (error: any) {
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