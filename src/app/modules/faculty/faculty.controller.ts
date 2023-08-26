import { Faculty } from '@prisma/client';
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
    message: 'Faculty fetched successful',
    meta: result.meta,
    data: result.data,
  });
});

export const facultyController = {
  createFacultyData,
  getFaculties,
};
