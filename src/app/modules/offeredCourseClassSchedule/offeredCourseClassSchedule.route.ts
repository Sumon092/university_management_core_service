import express from 'express';
import { ClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post('/create-schedule', ClassScheduleController.createClassSchedule);

router.get('/', ClassScheduleController.getAllClassSchedule);

export const ClassScheduleRoutes = router;
