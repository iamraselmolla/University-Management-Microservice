export interface StudentCreateInput {
  studentId: string;
  firstName: string;
  lastName: string;
  middleName?: string | null; // Can be null or undefined
  profileImage?: string | null; // Can be null or undefined
  email: string;
  contactInfo: string;
  gender: string;
  bloodGroup: string;
  academicSemesterId: string;
  academicDepartmentId: string;
  academicFacultyId: string;
}

export interface Student {
  id?: string;
  studentId: string;
  firstName: string;
  lastName: string;
  middleName?: string | null; // Updated to match Prisma's type
  profileImage?: string | null; // Updated to match Prisma's type
  email: string;
  contactInfo: string;
  gender: string;
  bloodGroup: string;
  createdAt?: Date; // Added to match Prisma's return type
  updatedAt?: Date; // Added to match Prisma's return type
  academicSemesterId: string;
  academicDepartmentId: string;
  academicFacultyId: string;
}
