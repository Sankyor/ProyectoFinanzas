import { User } from "../Interfaces/user.interface";
import { UserModel } from "../Models/user.model";


const getUserById = async (id_user: string) => {
    const user = await UserModel.findUserById(id_user);
    return user;
}
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findUserByEmail(email);
    return user;
}

const createUser = async (user: User) => {
    const newUser = await UserModel.create(user);

    return newUser;
}

export const userService = {
    getUserById,
    getUserByEmail,
    createUser
}