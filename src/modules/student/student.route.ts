import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
//will call controller function
// router.post('/create-student', StudentControllers.createStudent);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudentIntoDB,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.deleteSingleStudent,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentControllers.getAllStudent,
);

export const StudentRoutes = router;
