import { OfferedCourseSection } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createCourseSection = async (
  data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const OfferedCourseSectionService = {
  createCourseSection,
};
