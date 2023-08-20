import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.services';

const addSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.addSemester(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester added successfully',
    data: result,
  });
});

export const semesterController = {
  addSemester,
};
