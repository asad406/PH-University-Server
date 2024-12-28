import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";


const loginUser = async (payload: TLoginUser) => {
    //check if the user is exist by static method
    const user = await User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'this user is not found')
    }
    /*
    //check if the user is exist
    const isUserExists = await User.findOne({id: payload?.id})
    console.log(isUserExists);
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'this user is not found')
    }
     */
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
    //check password
    // const isPasswordMatched = await bcrypt.compare(payload.password, user.password)
    // console.log(isPasswordMatched);
    if (!await User.isPasswordMatched(payload?.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
    }
    //create token and send to the client

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string,
        {
            expiresIn: '30d'
        }
    )
    return {
        accessToken,
        needPasswordChange: user?.needsPasswordChange
    }
}
const changePassword =async (userData: JwtPayload, payload:{ oldPassword:string;newPassword:string}) => {
    //check if the user is exist by static method
    const user = await User.isUserExistsByCustomId(userData.userId);
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
    //check password
    if (!await User.isPasswordMatched(payload?.oldPassword, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
    }
    //hash new password
    const newHashPassword = await bcrypt.hash(payload?.newPassword,Number(config.bcrypt_salt_round))
    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    },{
        password:newHashPassword,
        needsPasswordChange:false,
        PasswordChangeAt: new Date()
    })
    return null
}
export const AuthService = {
    loginUser,
    changePassword
}