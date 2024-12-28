import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';
const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

router.get('/:facultyId', offeredCourseController.getSingleOfferedCourse);

router.get('/', offeredCourseController.getAllOfferedCourses);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
