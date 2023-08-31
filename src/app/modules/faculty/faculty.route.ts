import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(facultyValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.updateFaculty
);
router.post(
  '/create',
  validateRequest(facultyValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.createFacultyData
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  facultyController.getFaculties
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  facultyController.getFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.deleteFaculty
);
router.post(
  '/:id/assign-courses',
  validateRequest(facultyValidation.assignOrRemoveCourses),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.assignCourses
);
router.delete(
  '/:id/remove-courses',
  validateRequest(facultyValidation.assignOrRemoveCourses),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.removeAssignCourses
);

export const facultyRoutes = router;
