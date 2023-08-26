import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/:id', semesterController.getSemester);
router.get('/', semesterController.getAllSemester);
router.post(
  '/add-semester',
  validateRequest(academicSemesterValidation.create),
  semesterController.addSemester
);
router.post(
  '/update/:id',
  validateRequest(academicSemesterValidation.update),
  semesterController.addSemester
);
router.delete('/delete/:id',semesterController.deleteSemester)
export const academicSemesterRoute = router;
