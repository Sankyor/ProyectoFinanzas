import { userService } from "./user.service"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginWithEmailAndPassword = async (email: string, password: string) => {
    const users = await userService.getAllUsers()
    const user = users.find(item => item.email === email)

    if (!user) {
        throw new Error("User not found");
    }

    // comparar los hash de contrasena
    const isValidPassword = await bcrypt.compare(password, user.password);
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