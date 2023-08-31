import { CourseFaculty, Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { facultyService } from './faculty.services';

const createFacultyData = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.createFacultyData(req.body);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data created',
    data: result,
  });
});

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await facultyService.getFaculties(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties fetched successful',
    meta: result.meta,
    data: result.data,
  });
});
const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await facultyService.getFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successful',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await facultyService.updateFaculty(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data update successful',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await facultyService.deleteFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty delete successful',
    data: result,
  });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body.courses;
  const result = await facultyService.assignCourses(id, payload);

  sendResponse<CourseFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course assign to faculties successfully',
    data: result,
  });
});
const removeAssignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body.courses;
  console.log(payload, 'data');
  const result = await facultyService.removeCourses(id, payload);

  sendResponse<CourseFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course remove from  assigned faculty successfully',
    data: result,
  });
});

export const facultyController = {
  createFacultyData,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
  assignCourses,
  removeAssignCourses,
};
