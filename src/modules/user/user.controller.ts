import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { verifyToken } from '../Auth/auth.utils';
import config from '../../config';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentToDB(
    req.file,
    password,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});
//create Faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});
//Create Admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${role} is retrieved successfully`,
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const result = await UserServices.changeStatusFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Status is changed successfully`,
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};

/*
type addFunc = (param1: number, param2:number) => number {}
const add : addFunc = (param1,param2) => {}
*/
