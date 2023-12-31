import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
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
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await academicDepartmentService.getDepartments(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.getDepartment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payLoad = req.body;
  const result = await academicDepartmentService.updateDepartment(id, payLoad);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await academicDepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successful',
    data: result,
  });
});

export const departmentController = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
