import express from 'express';
import { departmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-department', departmentController.createDepartment);
router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartment);

export const departmentRoutes = router;
