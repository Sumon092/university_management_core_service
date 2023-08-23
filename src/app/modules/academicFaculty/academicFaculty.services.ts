import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const createFaculty = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  return result;
};

const getFaculties = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicFaculty.findMany({
    where: {},
    skip,
    take: limit,
  });

  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
