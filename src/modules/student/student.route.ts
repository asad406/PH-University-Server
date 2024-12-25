import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod.validation';
const router = express.Router();
//will call controller function
// router.post('/create-student', StudentControllers.createStudent);
router.get('/:id', StudentControllers.getSingleStudent);

router.patch('/:id',
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudentIntoDB);

router.delete('/:id', StudentControllers.deleteSingleStudent);

router.get('/', StudentControllers.getAllStudent);

export const StudentRoutes = router;