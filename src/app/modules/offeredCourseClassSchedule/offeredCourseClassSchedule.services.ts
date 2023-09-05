import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { hasTimeConflict } from '../../../shared/utils';

const createSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const isRoomBookedRoomOnDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        room: {
          id: data.roomId,
        },
      },
    });
  const existingTimeSlots = isRoomBookedRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  if (hasTimeConflict(existingTimeSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is already booked');
  }
  const result = await prisma.offeredCourseClassSchedule.create({
    data,
  });

  return result;
};

export const offeredCourseClassScheduleService = { createSchedule };
