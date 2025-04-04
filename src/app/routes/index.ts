import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { BuildingRouter } from '../modules/building/building.routes';
import { RoomRouter } from '../modules/room/room.routes';
import { StudentRouter } from '../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/buildings',
    route: BuildingRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/rooms',
    route: RoomRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
