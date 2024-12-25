import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent)

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserController.createFaculty)

router.post('/create-admin', validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent)



export const UserRoutes = router