import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentToDB = async (password: string, studentData: TStudent) => {
    //create a user object
    const userData: Partial<TUser> = {}
    //if password is not given, use default password
    userData.password = password || (config.default_password as string)
    //set student role
    userData.role = "student"
    //set manually generated it
    userData.id = '20230003'
    //create a user 
    const newUser = await User.create(userData)

    //create a student
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id //Embedded id
        studentData.user = newUser._id //reference _id

        const newStudent = await StudentModel.create(studentData)
        return newStudent
    }
    // // const data = new User(user)
    // const result = await data.save()
    // return result
}

export const UserServices = {
    createStudentToDB
}