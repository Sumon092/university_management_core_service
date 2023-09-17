/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  academicSemesterSearchAbleFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constants';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const addSemester = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  if (
    academicSemesterTitleCodeMapper[academicSemesterData.title] !==
    academicSemesterData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_CREATED,
      JSON.stringify(result)
    );
  }
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: academicSemesterSearchAbleFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  /**
   * person={name:'sumon'}
   * name=person[name ]
   */
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicSemester.findMany({
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
const getSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSemester = async (
  id: string,
  payLoad: Partial<AcademicSemester>
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payLoad,
    include: {
      students: true,
    },
  });
  return result;
};

const deleteSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};
export const academicSemesterService = {
  addSemester,
  getAllSemester,
  getSemester,
  updateSemester,
  deleteSemester,
};
