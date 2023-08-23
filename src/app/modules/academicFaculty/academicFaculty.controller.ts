import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

export const academicFacultyController = {
  createFaculty,
};
