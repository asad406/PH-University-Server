
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// const createStudentIntoDB = async (student: TStudent) => {
//   const studentData = new StudentModel(student)
//   const result = await studentData.save();
//   // const result = await StudentModel.create(student);
//   return result; // result will go to controller
// };
const getAllStudentFromDB = async (query: Record<string, unknown>) => {

  /*
  {email: { $regex : query.searchTerm, $options: "i"}}
  {presentAddress: {$regex: query.searchTerm, $options: "i"}}
  {'name.firstName': {$regex : query.searchTerm, $option: 'i'}}  
  */
  const queryObj = { ...query }
  const studentSearchableField = ['email', 'name.firstName', 'presentAddress']
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  //searching
  const searchQuery = StudentModel.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })
  //Filtering
  const excludeFields = ['searchTerm']
  excludeFields.forEach((el) => delete queryObj[el]);
  const result = await searchQuery
    .find(queryObj)
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
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData
  }
  /*
  we send it-->
    guardian : {
      fatherOccupation: "Teacher"
    }

  we make it -->
    guardian.fatherOccupation = "Teacher"
  */
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  console.log(modifiedUpdatedData);
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true })

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
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete student.')
  }

};
export const StudentServices = {
  //to send export func name
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteSingleStudentFromDB
};
