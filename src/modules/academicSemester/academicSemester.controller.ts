import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created successfully',
        data: result,
    })
})
export const AcademicSemesterController = {
    createAcademicSemester
}