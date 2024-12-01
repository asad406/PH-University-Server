import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { UserServices } from "./user.service";

const createStudent = async(req: Request,res: Response, next:NextFunction) => {
  try{
    const {password, student:studentData} = req.body
    const result = await UserServices.createStudentToDB(password,studentData)
   
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