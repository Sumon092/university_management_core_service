import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleService } from './offeredCourseClassSchedule.services';

const createClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseClassScheduleService.createSchedule(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Schedule created successfully',
    data: result,
  });
});

export const ClassScheduleController = { createClassSchedule };
