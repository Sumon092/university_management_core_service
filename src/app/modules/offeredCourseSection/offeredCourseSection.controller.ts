import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionService } from './offeredCourseSection.services';

const createCourseSection = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.createCourseSection(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course section created successfully',
    data: result,
  });
});
const getAllOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseSectionService.getAllOfferedCourseSection();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course section fetched successfully',
      data: result,
    });
  }
);

export const OfferedCourseSectionController = {
  createCourseSection,
  getAllOfferedCourseSection,
};
