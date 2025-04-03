import { AcademicSemester, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

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

const getAllAcademicSemesters = async (
  filters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicSemester.findMany({
    skip,
    take: Number(limit),
  });
  const total = await prisma.academicSemester.count();
  return {
    data: result,
    meta: {
      page: Math.ceil(total / limit),
      limit,
      total,
    },
  };
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
