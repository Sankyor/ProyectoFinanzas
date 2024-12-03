import { User } from "../Interfaces/user.interface";
import { UserModel } from "../Models/user.model";
import { nanoid } from "nanoid"
import bcrypt from "bcryptjs"

const getAllUsers = async () => {
    const users = await UserModel.readUsers();
    return users;
}
const getUserById = async (id: string) => {
    const users = await UserModel.readUsers();
    const user = users.find((user: User) => user.id === id);
    return user;
};

// const getUserByEmail = async(email:string)=>{
//     const users = await getAllUsers();

// }

const createUserWithEmailAndPassword = async (email: string, password: string) => {
    const users = await getAllUsers();
    const user = users.find((item) => item.email === email);
    if (user) {
        throw new Error("Email already exists");
    }

    // {
    //     id: 1,
    //     email: "prueba@prueba.cl",
    //     password: "123123"
    // }
    const salt = await bcrypt.genSalt(10); //hace que las contrasenas iguales se hasheen diferentes
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser: User = {
        id: nanoid(),
        email,
        password: passwordHashed //npm bcrypt
    }
    users.push(newUser);
    await UserModel.writeUsers(users);
    return newUser;
}

export const userService = {
    getAllUsers,
    getUserById,
    createUserWithEmailAndPassword
}