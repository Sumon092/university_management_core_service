import express from 'express';
import { OfferedCoursesControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  OfferedCoursesControllers.createOfferedCourse
);

export const OfferedCoursesRoutes = router;
