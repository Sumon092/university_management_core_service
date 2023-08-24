import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.create),
  studentController.createStudent
);
router.get('/', studentController.getStudents);

export const studentRoutes = router;
