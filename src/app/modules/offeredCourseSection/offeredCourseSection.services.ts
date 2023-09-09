/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { asyncForEach } from '../../../shared/utils';
import { OfferedCourseClassScheduleUtils } from '../offeredCourseClassSchedule/offeredCourseSchedule.utils';

const createCourseSection = async (
  payload: any
): Promise<OfferedCourseSection> => {
  const { classSchedule, ...data } = payload;
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offerCourseId,
    },
  });
  console.log(data);
  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found');
  }
  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;
  await asyncForEach(classSchedule, async (schedule: any) => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailability(schedule);
    await OfferedCourseClassScheduleUtils.checkFacultyAvailability(schedule);
  });
  const createSection = await prisma.$transaction(async transactionClient => {
    const createOfferedCourseSection =
      await transactionClient.offeredCourseSection.create({
        data,
      });

    const scheduleData = classSchedule.map((schedule: any) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: createOfferedCourseSection.id,
      semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId,
    }));
    const createSchedule =
      await transactionClient.offeredCourseClassSchedule.createMany({
        data: scheduleData,
      });
    return createSchedule;
  });
};

const getAllOfferedCourseSection = async () => {
  const result = await prisma.offeredCourseSection.findMany();
  return result;
};

export const OfferedCourseSectionService = {
  createCourseSection,
  getAllOfferedCourseSection,
};
