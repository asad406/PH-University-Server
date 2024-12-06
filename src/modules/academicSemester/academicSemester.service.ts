import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    if (academicSemesterCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester code')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getSingleAcademicSemesterFromDB
}