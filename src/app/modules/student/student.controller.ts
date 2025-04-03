import { Request, Response } from 'express';
import * as studentService from './student.services';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
