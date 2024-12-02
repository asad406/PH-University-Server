import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "./user.model";
import { UserServices } from "./user.service";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body
    const result = await UserServices.createStudentToDB(password, studentData)

    res.status(200).json({
      message: 'Student created successfully',
      success: true,
      result
    })
  } catch (err) {
    next(err)
  }
}
export const UserController = {
  createStudent
}

/*
type addFunc = (param1: number, param2:number) => number {}
const add : addFunc = (param1,param2) => {}
*/