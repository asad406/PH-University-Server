import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { enrolledCourseController } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationZodSchema,
  ),
  enrolledCourseController.createEnrolledCourse,
);
router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidation.updateEnrolledCourseMarksValidationZonSchema,
  ),
  enrolledCourseController.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
