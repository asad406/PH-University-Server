import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getSingleCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  courseController.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.CourseFacultyValidationSchema),
  courseController.assignFacultiesWithCourse,
);
router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.CourseFacultyValidationSchema),
  courseController.removeFacultiesFromCourse,
);

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getAllCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

export const CourseRoutes = router;
