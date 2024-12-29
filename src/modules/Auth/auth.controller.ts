import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is login successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(req.user, passwordData);
  // console.log(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access Token is retrieved successfully',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthService.forgetPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset Password successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
