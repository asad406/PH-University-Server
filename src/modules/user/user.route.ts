import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent)

export const UserRoutes = router