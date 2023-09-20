import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.updateFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicFacultyController.getFaculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicFacultyController.getFaculties
);

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.createFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.deleteFaculty
);

export const academicFacultyRoutes = router;
