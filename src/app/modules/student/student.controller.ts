import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
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

const getStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await studentService.getStudents(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data fetched successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payLoad = req.body;
  const result = await studentService.updateStudent(id, payLoad);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update successful',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentService.deleteStudent(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete successful',
    data: result,
  });
});

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await studentService.myCourses(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Courses data fetched successfully',
    data: result,
  });
});

export const studentController = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  myCourses,
};
