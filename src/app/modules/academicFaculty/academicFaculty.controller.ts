import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.services';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.createFaculty(req.body);

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty created successfully',
    data: result,
  });
});
const getFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.params, ['searchTerm', 'id']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await academicFacultyService.getFaculties(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.getFaculty(req.params.id);

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty fetched successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createFaculty,
  getFaculties,
  getFaculty,
};
