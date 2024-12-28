import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status"

const loginUser = catchAsync(async (req,res)=>{
    const result = await AuthService.loginUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is login successfully',
        data: result

    });
})
const changePassword = catchAsync(async (req,res)=>{
    const {...passwordData} = req.body
    const result = await AuthService.changePassword(req.user, passwordData)
    // console.log(req.user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
        data: result

    });
})

export const AuthController = {
    loginUser,
    changePassword
}