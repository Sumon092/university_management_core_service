import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentService } from './academicDepartment.services';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.createDepartment(req.body);

  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'department created successfully',
    data: result,
  });
});

const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['title', 'academicFacultyId']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await academicDepartmentService.getDepartments(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const departmentController = {
  createDepartment,
  getDepartments,
};
