import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.get('/get-faculty/:id', academicFacultyController.getFaculty);
router.post('/create-faculty', academicFacultyController.createFaculty);

export const academicFacultyRoutes = router;
