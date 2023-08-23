import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createFaculty = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  return result;
};

const getFaculties = async () => {
  const result = await prisma.academicFaculty.findMany();
  return result;
};

const getFaculty = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const academicFacultyService = {
  createFaculty,
  getFaculties,
  getFaculty,
};
