import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment)

router.get('/:DepartmentId',AcademicDepartmentControllers.getSingleAcademicDepartment)

router.get('/',AcademicDepartmentControllers.getAllAcademicDepartments)

router.patch('/:DepartmentId', validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)

export const AcademicDepartmentRoutes = router
