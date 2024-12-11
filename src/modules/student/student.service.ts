
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.const';

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

  http://localhost:5000/api/students?email=summer2@example.com&searchTerm=mic
  
  const queryObj = { ...query }
  const studentSearchableField = ['email', 'name.firstName', 'presentAddress']

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  //searching
  const searchQuery = StudentModel.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' } //i for case insensitive 
    }))
  })
  //Filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    });

  //http://localhost:5000/api/students?sort=email
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string
  }
  const sortQuery = filterQuery.sort(sort);
  // http://localhost:5000/api/students?page=1&limit=2
  //http://localhost:5000/api/students?limit=1

  //pagination and limiting
  let limit = 1
  let page = 1
  let skip = 0

  if (query.limit) {
    limit = query.limit as number
  }

  if (query.page) {
    page = query.page as number
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)

  const limitQuery = paginateQuery.limit(limit)
  
  //http://localhost:5000/api/students?fields=name,email
  //field limiting
  let fields = '-__v'
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
    // console.log({fields});
  }
  const fieldQuery = await limitQuery.select(fields)

  return fieldQuery; // result will go to controller
  */
  const studentQuery = new QueryBuilder(StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    }), query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result = await studentQuery.modelQuery;
    return result;
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
