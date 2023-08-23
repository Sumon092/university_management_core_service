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

export const academicFacultyService = {
  createFaculty,
};
