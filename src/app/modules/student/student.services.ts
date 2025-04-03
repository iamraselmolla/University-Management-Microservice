// src/services/studentService.ts
import { PrismaClient } from '@prisma/client';
import { Student, StudentCreateInput } from './student.interface';
const prisma = new PrismaClient();

export const createStudent = async (data: StudentCreateInput) => {
  return prisma.student.create({ data });
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  return prisma.student.findUnique({ where: { id } });
};

export const getAllStudents = async (): Promise<Student[]> => {
  return prisma.student.findMany();
};

export const updateStudent = async (id: string, data: Partial<Student>) => {
  return prisma.student.update({ where: { id }, data });
};

export const deleteStudent = async (id: string): Promise<Student> => {
  return prisma.student.delete({ where: { id } });
};
