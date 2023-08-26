import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/get-faculty/:id', academicFacultyController.getFaculty);
router.get('/', academicFacultyController.getFaculties);
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.create),
  academicFacultyController.createFaculty
);
router.patch(
  '/update/:id',
  validateRequest(AcademicFacultyValidation.update),
  academicFacultyController.updateFaculty
);
router.delete('/delete/:id', academicFacultyController.deleteFaculty);

export const academicFacultyRoutes = router;
