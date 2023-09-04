import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesControllers } from './offeredCourse.controller';
import { OfferedCourseValidationSchema } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidationSchema.create),
  OfferedCoursesControllers.createOfferedCourse
);

export const OfferedCoursesRoutes = router;
