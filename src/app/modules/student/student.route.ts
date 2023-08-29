import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.create),
  studentController.createStudent
);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.update),
  studentController.updateStudent
);
router.delete('/delete/:id', studentController.deleteStudent);

export const studentRoutes = router;
