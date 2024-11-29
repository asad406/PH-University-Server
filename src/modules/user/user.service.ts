import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentToDB = async (user: TUser) => {
    const data = new User(user)
    const result = await data.save()
    return result
}

export const UserService = {
    createStudentToDB
}