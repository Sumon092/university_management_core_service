import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await OfferedCourseServices.createOfferedCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCourse();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course fetched successfully',
    data: result,
  });
});

export const OfferedCoursesControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
};
