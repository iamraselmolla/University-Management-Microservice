import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createAcademicSemester = async (semesterData: {
  year: string;
  title: string;
  code: string;
  startMonth: string;
  endMonth: string;
}) => {
  const findSemester = await prisma.academicSemester.findFirst({
    where: {
      title: semesterData.title,
      year: semesterData.year,
    },
  });

  if (findSemester) {
    throw new Error('Semester already exists');
  }
  return await prisma.academicSemester.create({
    data: semesterData,
  });
};

const getAllAcademicSemesters = async () => {
  return await prisma.academicSemester.findMany({
    include: { students: true }, // Include related students
  });
};

const getAcademicSemesterById = async (id: string) => {
  return await prisma.academicSemester.findUnique({
    where: { id },
    include: { students: true },
  });
};

const updateAcademicSemester = async (
  id: string,
  updatedData: Partial<{
    year: string;
    title: string;
    code: string;
    startMonth: string;
    endMonth: string;
  }>
) => {
  return await prisma.academicSemester.update({
    where: { id },
    data: updatedData,
  });
};

const deleteAcademicSemester = async (id: string) => {
  return await prisma.academicSemester.delete({
    where: { id },
  });
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
};
