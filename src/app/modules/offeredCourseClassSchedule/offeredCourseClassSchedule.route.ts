import express from 'express';
import { ClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post('/create-schedule', ClassScheduleController.createClassSchedule);

export const ClassScheduleRoutes = router;
