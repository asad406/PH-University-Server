import { Model, Types } from "mongoose";
import { string } from "zod";

export type TGender = 'male' | 'female' | 'other'
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type TUerName = {
    firstName : string;
    middleName : string;
    lastName : string
}

export type TFaculty = {
    id: string;
    user: Types.ObjectId
    designation: string;
    name: TUerName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
}

export interface FacultyModel extends Model<TFaculty> {
    isUserExists(id:string): Promise<TFaculty | null>;
}