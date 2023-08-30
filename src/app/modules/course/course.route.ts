import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidationSchema } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidationSchema.create),
  CourseController.createCourse
);
router.get('/', CourseController.getCourses);
export const CourseRoutes = router;
