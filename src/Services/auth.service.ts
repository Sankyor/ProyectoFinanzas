import { userService } from "./user.service"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await userService.getUserByEmail(email)
    if (!user) {
        throw new Error("User not found");
    }
    // comparar los hash de contrasena
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        throw new Error("Password incorrect")
    }
    // generar el token JWT https://jwt.io/
    const token = jwt.sign({ email: user.email }, "secret", {
        expiresIn: "1h"
    }) //secret, normalmente se pone en el env

    return { token };
};

export const authService = {
    loginWithEmailAndPassword
}