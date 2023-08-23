/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const createDepartment = async (
  academicDepartmentData: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
  });
  return result;
};

const getDepartments = async (
  options: IPaginationOptions,
  filters: IAcademicDepartmentFilterRequest
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'academicFacultyId'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const result = await prisma.academicDepartment.findMany({
    skip,
    take: limit,
  });
  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicDepartmentService = {
  createDepartment,
  getDepartments,
};
