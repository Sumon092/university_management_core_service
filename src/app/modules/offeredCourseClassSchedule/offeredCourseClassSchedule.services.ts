import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { OfferedCourseClassScheduleUtils } from './offeredCourseSchedule.utils';

const createSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailability(data);

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      room: true,
      faculty: true,
    },
  });

  return result;
};

export const offeredCourseClassScheduleService = { createSchedule };
