import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { departmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.create),
  departmentController.createDepartment
);
router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartment);
router.patch('/update/:id', departmentController.updateDepartment);

export const departmentRoutes = router;
