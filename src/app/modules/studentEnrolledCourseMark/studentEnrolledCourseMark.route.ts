import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-final-marks',
  StudentEnrolledCourseMarkController.updateFinalMarks
);
router.patch('/update-marks', StudentEnrolledCourseMarkController.updateMarks);
router.get('/', StudentEnrolledCourseMarkController.getAllFromDB);

export const StudentEnrolledCourseMarkRoutes = router;
