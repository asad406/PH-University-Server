import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
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
const getAllStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is retrieved successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
};
const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Students are retrieved successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
};
const deleteSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is deleted successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
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
