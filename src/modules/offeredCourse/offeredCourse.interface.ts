import { Types } from "mongoose"
export type TDays = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export type TOfferedCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester?: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course:Types.ObjectId;
    faculty:Types.ObjectId;
    section: number,
    maxCapacity: number;
    days: TDays[];
    startTime: string;
    endTime: string
}

export type TSchedule = {
    days: TDays[],
    startTime: string,
    endTime: string
}