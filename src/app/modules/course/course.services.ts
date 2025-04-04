import { Course, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async (
  data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Course> => {
  return prisma.course.create({ data });
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  return prisma.course.findUnique({ where: { id } });
};

export const getAllCourses = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}> => {
  const skip = (page - 1) * limit;
  const [courses, total] = await Promise.all([
    prisma.course.findMany({ skip, take: limit }),
    prisma.course.count(),
  ]);

  return { courses, total, page, limit };
};

export const updateCourse = async (
  id: string,
  data: Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Course> => {
  return prisma.course.update({ where: { id }, data });
};

export const deleteCourse = async (id: string): Promise<Course> => {
  return prisma.course.delete({ where: { id } });
};
