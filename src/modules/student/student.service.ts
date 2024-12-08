
import { StudentModel } from './student.model';

// const createStudentIntoDB = async (student: TStudent) => {
//   const studentData = new StudentModel(student)
//   const result = await studentData.save();
//   // const result = await StudentModel.create(student);
//   return result; // result will go to controller
// };
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
  .populate('admissionSemester')
  .populate ({
    path: 'academicDepartment',
    populate : {
      path: 'academicFaculty'
    }
  });
  return result; // result will go to controller
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  .populate('admissionSemester')
  .populate ({
    path: 'academicDepartment',
    populate : {
      path: 'academicFaculty'
    }
  });
  return result; // result will go to controller
};
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result; // result will go to controller
};
export const StudentServices = {
  //to send export func name
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB
};
