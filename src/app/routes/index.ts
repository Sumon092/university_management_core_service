import express from 'express';

import { departmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { CourseRoutes } from '../modules/course/course.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { RoomRoutes } from '../modules/room/room.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
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
  {
    path: '/buildings',
    routes: BuildingRoutes,
  },
  {
    path: '/rooms',
    routes: RoomRoutes,
  },
  {
    path: '/courses',
    routes: CourseRoutes,
  },
  {
    path: '/semesters-registration',
    routes: SemesterRegistrationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
