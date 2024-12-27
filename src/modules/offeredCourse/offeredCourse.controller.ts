import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";
import httpStatus from "http-status";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is created successfully',
        data: result

    });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await offeredCourseServices.getAllOfferedCourseFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Courses are retrieved successfully',
        data: result,
    })
})

const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await offeredCourseServices.getSingleOfferedCourseFromDB(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is retrieved successfully',
        data: result,
    })
});

const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await offeredCourseServices.updateOfferedCourseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Courses is update successfully',
        data: result,
    })
});

export const offeredCourseController = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse
}