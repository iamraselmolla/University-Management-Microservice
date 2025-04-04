import express from 'express';
import * as courseController from './course.controller';

const router = express.Router();

// Create Course
router.post('/', courseController.createCourse);

// Get Course by ID
router.get('/:id', courseController.getCourseById);

// Get All Courses (with pagination)
router.get('/', courseController.getAllCourses);

// Update Course
router.put('/:id', courseController.updateCourse);

// Delete Course
router.delete('/:id', courseController.deleteCourse);

export const CourseRouter = router;
