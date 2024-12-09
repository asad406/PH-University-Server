
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

// const createStudentIntoDB = async (student: TStudent) => {
//   const studentData = new StudentModel(student)
//   const result = await studentData.save();
//   // const result = await StudentModel.create(student);
//   return result; // result will go to controller
// };
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    });
  return result; // result will go to controller
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    });
  return result; // result will go to controller
};


const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction()
    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session });

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Student')
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session })

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted User')
    }
    await session.commitTransaction();
    await session.endSession();

    return deleteStudent; // result will go to controller
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }

};
export const StudentServices = {
  //to send export func name
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB
};
