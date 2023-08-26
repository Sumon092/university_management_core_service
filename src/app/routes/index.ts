import express from 'express';

import { departmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { studentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/semester',
    routes: academicSemesterRoute,
  },
  {
    path: '/aca-faculties',
    routes: academicFacultyRoutes,
  },
  {
    path: '/departments',
    routes: departmentRoutes,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/faculties',
    routes: facultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
