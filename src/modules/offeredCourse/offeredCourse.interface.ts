import { Types } from "mongoose"
export type Days = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export type TOfferedCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester?: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course:Types.ObjectId;
    faculty:Types.ObjectId;
    section: number,
    maxCapacity: number;
    days: Days[];
    startTime: string;
    endTime: string
}