import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    type TAcademicSemesterCodeMapper = {
        [key: string]: string
    }

    const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03'
    }
    if(academicSemesterCodeMapper[payload.name] !== payload.code){
        throw new Error ('Invalid Semester code')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB
}