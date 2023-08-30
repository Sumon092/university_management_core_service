import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableField } from './course.constants';
import { CourseServices } from './course.services';
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourse(req.body);

  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableField);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await CourseServices.getCourses(filters, options);

  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const CourseController = {
  createCourse,
  getCourses,
};
