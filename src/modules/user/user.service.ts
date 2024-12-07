import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import generateStudentId from "./user.utils";

const createStudentToDB = async (password: string, payload: TStudent) => {
    //create a user object
    const userData: Partial<TUser> = {}
    //if password is not given, use default password
    userData.password = password || (config.default_password as string)
    //set student role
    userData.role = "student"
    //automatically generated it
    //year  semesterCode  4 digit number
    /*
        // find academic semester info
        const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
    
        //set  generated id
        userData.id = await generateStudentId(admissionSemester)
    */
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );
    if (!admissionSemester){
        throw new Error("Semester id not found")
    }
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);
    //create a user 
    const newUser = await User.create(userData)

    //create a student
    if (Object.keys(newUser).length) {
        payload.id = newUser.id //Embedded id
        payload.user = newUser._id //reference _id

        const newStudent = await StudentModel.create(payload)
        return newStudent
    }
    // // const data = new User(user)
    // const result = await data.save()
    // return result
}

export const UserServices = {
    createStudentToDB
}