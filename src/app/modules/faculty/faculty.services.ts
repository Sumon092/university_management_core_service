import { Faculty } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createFacultyData = async (facultyData: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data: facultyData,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const facultyService = {
  createFacultyData,
};
