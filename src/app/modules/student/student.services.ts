/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';
import { IStudentFilterRequest } from './student.interface';

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

const getStudents = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(filterData, 'filter data');
  console.log(searchTerm, 'searchTerm');
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    Object.keys(filterData).map(key => {
      if (studentRelationalFields.includes(key)) {
        return {
          [studentRelationalFieldsMapper[key]]: {
            id: (filterData as any)[key],
          },
        };
      } else {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }
    });
  }
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.student.findMany({
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
      academicSemester: true,
    },
  });
  const total = await prisma.student.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const studentService = {
  createStudent,
  getStudents,
};
