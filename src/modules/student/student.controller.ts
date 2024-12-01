import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import { z } from "zod";
// import studentValidationSchema from './student.zod.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // Creating a schema validation using Zod
//     const { student: studentData } = req.body;
//     //data validation using zod
//     const zodParsedData = studentValidationSchema.parse(studentData)
//     // will call service function to send this Data
//     const result = await StudentServices.createStudentIntoDB(zodParsedData);
//     //send response to client
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: 'Something went wrong',
//       error
//     });
//     // eslint-disable-next-line no-console
//     // console.log(error);
//   }
// };
// Data receive from student.service
const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
export const StudentControllers = {
  //It will use Router
  // createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent
};
