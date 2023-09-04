import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post(
  '/create-course-section',
  OfferedCourseSectionController.createCourseSection
);

export const OfferedCourseSectionRoutes = router;
