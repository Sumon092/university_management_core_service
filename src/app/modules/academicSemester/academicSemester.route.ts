import express from 'express';
import { semesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/add-semester', semesterController.addSemester);
export const academicSemesterRoute = router;


