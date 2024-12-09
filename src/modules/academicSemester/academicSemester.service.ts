import AppError from "../../errors/AppError";
import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";
import httpStatus from "http-status";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    if (academicSemesterCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND as number,'Invalid Semester code')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findOne({id});
    return result;
  };

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getSingleAcademicSemesterFromDB
}