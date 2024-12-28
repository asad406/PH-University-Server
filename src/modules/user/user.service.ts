import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";

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
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND as number, "Semester id not found")
    }
    //step - 1
    const session = await mongoose.startSession();
    try {
        //step- 2
        session.startTransaction()
        //set  generated id
        userData.id = await generateStudentId(admissionSemester);

        //create a user 
        // const newUser = await User.create(userData)
        //create a student
        // if (Object.keys(newUser).length) {
        //     payload.id = newUser.id //Embedded id
        //     payload.user = newUser._id //reference _id

        //     const newStudent = await StudentModel.create(payload)
        //     return newStudent
        // }

        //step - 3 (transaction-1)
        const newUser = await User.create([userData], { session }) // it's return an array
        //create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        payload.id = newUser[0].id //Embedded id
        payload.user = newUser[0]._id //reference _id

        //step - 4 (transaction-2)
        const newStudent = await Student.create([payload], { session })
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student')
        }
        //step - 5 
        await session.commitTransaction();
        await session.endSession();

        return newStudent
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to create student')
    }
    // // const data = new User(user)
    // const result = await data.save()
    // return result
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use default password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


const createAdminIntoDB = async (password: string, payload: TAdmin) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set admin role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const UserServices = {
    createStudentToDB,
    createFacultyIntoDB,
    createAdminIntoDB
}