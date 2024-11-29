import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service";

const createStudent = async(req: Request,res: Response) => {
  try{
    const body = req.body
    const result = await UserService.createStudentToDB(body)
    res.status(200).json({
        message: 'Student created successfully',
        success: true
    })
  } catch (error) {
    console.log(error);
  }
}
export const UserController = {
    createStudent
}