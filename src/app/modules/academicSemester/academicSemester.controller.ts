import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  academicSemesterFilterAbleFields,
  academicSemesterOptions,
} from './academicSemester.constants';
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

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterAbleFields);
  const options = pick(req.query, academicSemesterOptions);
  const result = await academicSemesterService.getAllSemester(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSemester = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params);
  const result = await academicSemesterService.getSemester(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester get successfully',
    data: result,
  });
});

export const semesterController = {
  addSemester,
  getAllSemester,
  getSemester,
};
