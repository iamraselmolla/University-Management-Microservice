export interface StudentCreateInput {
  studentId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  profileImage?: string;
  email: string;
  contactInfo: string;
  gender: string;
  bloodGroup: string;
  academicSemesterId: string;
  academicDepartmentId: string;
  academicFacultyId: string;
}
