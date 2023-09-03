import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();

router.post(
  '/semester-registration',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.createSemesterRegistration
);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  SemesterRegistrationController.updateOneInDB
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  SemesterRegistrationController.getAllRegisteredSemester
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  SemesterRegistrationController.getByIdFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteByIdFromDB
);

export const SemesterRegistrationRoutes = router;
