import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/:id', courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.CourseFacultyValidationSchema),
  courseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.CourseFacultyValidationSchema),
  courseController.removeFacultiesFromCourse,
);

router.get('/', courseController.getAllCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

export const CourseRoutes = router;
