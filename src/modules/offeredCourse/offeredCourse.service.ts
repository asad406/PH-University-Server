import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import httpStatus from "http-status";




const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload

    const isSemesterRegistrationExist = await SemesterRegistration.findById(semesterRegistration)
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found')
    }

    const academicSemester = isSemesterRegistrationExist?.academicSemester

    const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
    if (!isAcademicFacultyExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found')
    }

    const isAcademicDepartmentExist = await AcademicDepartment.findById(academicDepartment)
    if (!isAcademicDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found')
    }

    const isCourseExist = await Course.findById(course)
    if (!isCourseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
    }

    const isFacultyExist = await Faculty.findById(faculty)
    if (!isFacultyExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
    }

    const result = await OfferedCourse.create({...payload, academicSemester});
    return result
}

const getAllOfferedCourseFromDB = async () => {
    const result = await OfferedCourse.find();
    return result;
}

const getSingleOfferedCourseFromDB = async (id: string) => {
    const result = await OfferedCourse.findOne({ id });
    return result
}

const updateOfferedCourseIntoDB = async (id: string, payload: Partial<TOfferedCourse>,) => {
    const result = await OfferedCourse.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        // runValidators: true
    })
    return result;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}