import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created successfully',
        data: result
    });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration are retrieved successfully',
        data: result,
    })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully',
        data: result,
    })
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log('reqParams',req.params);
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);
    console.log({result});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is update successfully',
        data: result,
    })
});

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}