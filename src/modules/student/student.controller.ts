import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
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
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
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
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
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
  });
});

const updateStudentIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is deleted successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(id);
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
  });
});
export const StudentControllers = {
  //It will use Router
  // createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudentIntoDB,
  deleteSingleStudent,
};
