import { Faculty, Prisma } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constants';
import { IFacultyFilterRequest } from './faculty.interface';

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

const getFaculties = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: facultySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.faculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  const total = await prisma.faculty.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const facultyService = {
  createFacultyData,
  getFaculties,
};
