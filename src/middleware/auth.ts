import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization
            // check is token exists
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized')
            }

            //check if the token is valid
            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
            const { role, userId, iat } = decoded
            //check if the user is exist by static method
            const user = await User.isUserExistsByCustomId(userId);
            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'this user is not found')
            }
            //check if the user is already deleted
            const isDeleted = user?.isDeleted
            if (isDeleted) {
                throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted')
            }
            //check if the user is already blocked
            const userStatus = user?.status
            if (userStatus === 'blocked') {
                throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked')
            }
            //check after password change token will not work
            if (user.PasswordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.PasswordChangeAt, iat as number)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
            }
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')

            }
            // const {userId,role} = decode
            req.user = decoded as JwtPayload

            next()
        }
    )
};

export default auth