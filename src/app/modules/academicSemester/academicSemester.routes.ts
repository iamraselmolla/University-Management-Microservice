import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);
router.get('/', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getAcademicSemesterById);
router.put('/:id', AcademicSemesterController.updateAcademicSemester);
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

export const AcademicSemesterRoutes = router;
