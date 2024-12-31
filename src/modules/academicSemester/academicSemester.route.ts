import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin', 'superAdmin'),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

export const AcademicSemesterRoute = router;
