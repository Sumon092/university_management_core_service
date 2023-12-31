import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constants';
import { SemesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistration(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Created',
      data: result,
    });
  }
);
const getAllRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await SemesterRegistrationServices.getAllRegisteredSemester(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched All Registered Semester',
      data: result,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration fetched successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration deleted successfully',
    data: result,
  });
});

const startRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await SemesterRegistrationServices.startMyRegistration(
    user?.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration  successfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await SemesterRegistrationServices.enrollIntoCourse(
    user?.userId,
    req.body
  );
  console.log(result, 'result');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration course enrolled successfully',
  });
});
const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await SemesterRegistrationServices.withDrawFromCourse(
    user?.userId,
    req.body
  );
  console.log(result, 'result');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'withdraw from course  successfully',
  });
});
const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await SemesterRegistrationServices.confirmMyRegistration(
      user?.userId
    );
    console.log(result, 'result');
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Registration confirmed',
    });
  }
);
const getMyRegistrationData = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await SemesterRegistrationServices.getMyRegistrationData(
      user?.userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Registration data fetched',
      data: result,
    });
  }
);

const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SemesterRegistrationServices.startNewSemester(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New semester started',
    data: result,
  });
});
const getMySemesterRegCourses = catchAsync(
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user as any;
    const id = user?.userId;

    const result = await SemesterRegistrationServices.getMySemRegCourses(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My reg courses fetched successfully',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllRegisteredSemester,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  startRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
  confirmMyRegistration,
  getMyRegistrationData,
  startNewSemester,
  getMySemesterRegCourses,
};
