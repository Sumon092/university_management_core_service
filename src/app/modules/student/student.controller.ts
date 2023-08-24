import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { studentService } from './student.services';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudent(req.body);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const studentController = {
  createStudent,
};
