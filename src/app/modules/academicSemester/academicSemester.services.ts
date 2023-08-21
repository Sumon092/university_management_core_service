import { AcademicSemester } from '@prisma/client';
import { prisma } from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

const addSemester = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

const getAllSemester = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterService = {
  addSemester,
  getAllSemester,
};
