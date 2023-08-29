import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(facultyValidation.update),
  facultyController.updateFaculty
);
router.post(
  '/create',
  validateRequest(facultyValidation.create),
  facultyController.createFacultyData
);
router.get('/', facultyController.getFaculties);
router.get('/:id', facultyController.getFaculty);
router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoutes = router;
