import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    PasswordChangeAt: Date
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>
    isPasswordMatched(plainTextPassword: string, hashPassword: string): Promise<boolean>
    isJWTIssuedBeforePasswordChanged(passwordChangeTimestamp:Date, jwtIssueTimestamp:Number):boolean
}
// export type NewUser = {
//     role: string,
//     password: string
//     id: string
// }


export type TUserRole = keyof typeof USER_ROLE
