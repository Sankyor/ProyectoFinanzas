
import { UserModel } from "./user.model";
import { HttpError } from "../Utils/httpError.util";
import bcrypt from "bcryptjs";



const getUserById = async (id_user: string) => {
    const user = await UserModel.findUserById(id_user);
    return user;
}
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findUserByEmail(email);
    return user;
}

const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    const user = await UserModel.findUserByEmail(email);

    if (user) {
        throw new HttpError("Email already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create(name, email, passwordHashed);

    return newUser;
}

const updateUserById = async (name: string, email: string) => {
    console.log(`Llega correo ${email}`)
    const oldUser = await UserModel.updateUserById(name, email);

    return oldUser;
}

const sleepUserByEmaail = async (email: string) => {
    const sleepUser = await UserModel.sleepUserByEmaail(email);

    return sleepUser;
}

export const userService = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    sleepUserByEmaail
}