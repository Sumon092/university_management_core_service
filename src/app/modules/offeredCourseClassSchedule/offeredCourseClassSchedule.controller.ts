import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { classScheduleFilterableFields } from './offeredCourseClassSchedule.constants';
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

const getAllClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, classScheduleFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await offeredCourseClassScheduleService.getAllClassSchedule(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Schedule created successfully',
    data: result,
  });
});

export const ClassScheduleController = {
  getAllClassSchedule,
  createClassSchedule,
};
