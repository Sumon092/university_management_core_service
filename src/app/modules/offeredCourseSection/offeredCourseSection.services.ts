import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';

const createCourseSection = async (
  data: any
): Promise<OfferedCourseSection> => {
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offerCourseId,
    },
  });
  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found');
  }
  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const OfferedCourseSectionService = {
  createCourseSection,
};
