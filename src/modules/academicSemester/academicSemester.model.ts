import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName,

    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    },
})
const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)

export default AcademicSemester