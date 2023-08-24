import { Student } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createStudent = async (studentData: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: studentData,
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  return result;
};

export const studentService = {
  createStudent,
};
