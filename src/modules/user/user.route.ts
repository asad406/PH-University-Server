import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req:Request, res:Response, next: NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);
router.get('/me', auth('admin', 'faculty', 'student'), UserController.getMe);

export const UserRoutes = router;
