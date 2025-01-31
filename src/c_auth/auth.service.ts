import bcrypt from "bcryptjs"
import { generateAccessToken } from "../Utils/auth.util";
import { HttpError } from "../Utils/httpError.util";
import { userService } from "../c_user/user.service";
import logger from "../Utils/logger.utils";

const loginWithEmailAndPassword = async (email: string, password: string) => {
    logger.info("auth.service-loginWithEmailAndPassword")

    const user = await userService.getUserByEmailLogin(email)
    if (!user) {
        throw new HttpError("Usuario o clave incorrecta", 400);
    }
    if (!user.active) throw new HttpError("Usuario o clave incorrecta", 400);

    // comparar los hash de contrasena
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        throw new HttpError("Usuario o clave incorrecta", 400);
    }
    if(!user.id_user) throw new HttpError("Error obteniendo usuario", 304);
    const token = generateAccessToken(user.email, user.id_user);
    return { token };
};
const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
) => {
    logger.info("auth.service-registerWithEmailAndPassword")
    const newUser = await userService.createUser(
        name,
        email,
        password
    );
    logger.info(`new user: ${newUser}`);
    if (!newUser.id_user) throw new HttpError("Error creando usuario", 304);
    const token = generateAccessToken(newUser.email, newUser.id_user);

    return token;
};

export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword
}