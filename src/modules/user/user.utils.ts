import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    //203001   0001
    return lastStudent?.id ? lastStudent.id : undefined;
  };

const generateStudentId = async (payload: TAcademicSemester,) => {
    let currentId =  (0).toString(); // by default 0
    const lastStudentId = await findLastStudentId(); // 2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4,6) // 01
    const lastStudentYear = lastStudentId?.substring(0,4) // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
        currentId =  lastStudentId.substring(6) // 0001
    }
    // const currentId = (0).toString().padStart(4, '0');
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`

    return incrementId
}

export default generateStudentId