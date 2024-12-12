import bcrypt from "bcryptjs"
import { generateAccessToken } from "../Utils/auth.util";
import { UserModel } from "../Models/user.model";
import { HttpError } from "../Utils/httpError.util";

const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await UserModel.findUserByEmail(email)
    if (!user.id_user) {
        throw new HttpError("Usuario o clave incorrecta", 400);
    }
    if (!user.active) throw new HttpError("Usuario o clave incorrecta", 400);

    // comparar los hash de contrasena
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        throw new HttpError("Usuario o clave incorrecta", 400);
    }
    const token = generateAccessToken(user.email, user.id_user);
    return { token };
};
const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
) => {
    console.log("registerWithEmailAndPassword")
    const newUser = await UserModel.create(
        name,
        email,
        password
    );
    if (!newUser[0].id_user) throw new Error("Error creando usuario");

    const token = generateAccessToken(newUser[0].email, newUser[0].id_user);

    return token;
};

export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword
}