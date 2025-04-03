// src/services/studentService.ts
import { PrismaClient } from '@prisma/client';
import { StudentCreateInput } from './student.interface';
const prisma = new PrismaClient();

export const createStudent = async (data: StudentCreateInput) => {
  return prisma.student.create({ data });
};

export const getStudentById = async (id: string) => {
  return prisma.student.findUnique({ where: { id } });
};

export const getAllStudents = async () => {
  return prisma.student.findMany();
};

export const updateStudent = async (
  id: string,
  data: Partial<StudentCreateInput>
) => {
  return prisma.student.update({ where: { id }, data });
};

export const deleteStudent = async (id: string) => {
  return prisma.student.delete({ where: { id } });
};
