import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(facultyValidation.create),
  facultyController.createFacultyData
);

export const facultyRoutes = router;
