import express from 'express';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/semester',
    routes: academicSemesterRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
