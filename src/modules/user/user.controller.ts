import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "./user.model";
import { UserServices } from "./user.service";

/*higher order function*/
const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(err => next(err))
  }
}

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentToDB(password, studentData)
  res.status(200).json({
    message: 'Student created successfully',
    success: true,
    result
  })
})
export const UserController = {
  createStudent
}

/*
type addFunc = (param1: number, param2:number) => number {}
const add : addFunc = (param1,param2) => {}
*/