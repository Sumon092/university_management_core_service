import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const facultyController = {
  createFacultyData,
};
