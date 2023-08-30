import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICourseData, ICourseFilterRequest } from './course.interface';

const createCourse = async (data: ICourseData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;
  
  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        try {
          await transactionClient.corseToPreRequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourses[index].courseId,
            },
          });
        } catch (error) {
          console.error(error, 'Error creating prerequisite');
        }
      }
    }
    return result;
  });
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getCourses = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions: Prisma.CourseWhereInput[] = []; // Declare here

  // Declare the orConditions array outside the if block
  const orConditions: Prisma.CourseWhereInput[] = [];

  if (searchTerm) {
    // Construct conditions for title and code
    orConditions.push(
      ...['title', 'code'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      }))
    );

    // Convert searchTerm to a number for numeric search on credits
    const numericSearchTerm = parseFloat(searchTerm);
    if (!isNaN(numericSearchTerm)) {
      orConditions.push({
        credits: {
          in: [numericSearchTerm], // You can adjust this logic for range searches
        },
      });
    }

    // Push the OR conditions to the AND conditions array
    andConditions.push({
      OR: orConditions,
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push({
      AND: filterConditions,
    });
  }

  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.course.findMany({
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
      preRequisite: true,
      preRequisiteFor: true,
    },
  });
  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const CourseServices = {
  createCourse,
  getCourses,
};
