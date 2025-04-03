import express from 'express';
import * as studentController from './student.controller';

const router = express.Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export const StudentRouter = router;
