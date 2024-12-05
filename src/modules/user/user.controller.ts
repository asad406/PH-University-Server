import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentToDB(password, studentData)
  // res.status(200).json({
  //   message: 'Student created successfully',
  //   success: true,
  //   result
  // })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})
export const UserController = {
  createStudent
}

/*
type addFunc = (param1: number, param2:number) => number {}
const add : addFunc = (param1,param2) => {}
*/