
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseService.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result

    });
});

const getAllCourse = catchAsync(async (req, res) => {
    const result = await courseService.getAllCourseFromDB(req.query);
    console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses are retrieved successfully',
        data: result,
    })
})

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseService.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    })
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseService.updateCourseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is updated successfully',
        data: result,
    })
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseService.deleteCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    })
});
//Assign Faculties With Course
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result = await courseService.assignFacultiesWithCourseIntoDB(courseId, faculties);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties added into Course successfully',
        data: result,
    })
});
//Remove Faculties from course
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result = await courseService.removeFacultiesFromCourseFromDB(courseId, faculties);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties delete from Course successfully',
        data: result,
    })
});


export const courseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}