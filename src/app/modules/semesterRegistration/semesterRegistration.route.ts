import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/semester-registration',
  SemesterRegistrationController.createSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
