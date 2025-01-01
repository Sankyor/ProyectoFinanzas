import { Request, Response, NextFunction } from "express"
import { userService } from "./user.service"
import { HttpError } from "../Utils/httpError.util";


const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user } = req.params;
        const user = await userService.getUserById(id_user)
        if (!user) throw new HttpError(`No se encuentra el usuario`, 400);

        res.json(user)
    } catch (error) {
        next(error);
    }
}
const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.query.email as string;
        const user = await userService.getUserByEmail(email)
        if (!user) throw new HttpError(`No se encuentra el usuario`, 400);

        res.json(user)
    } catch (error) {
        next(error);
    }
}
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password_hash } = req.body
        if (!name || !email || !password_hash) {
            throw new HttpError(`Error al agregar Usuario, dato faltante`, 304);

        }
        const newUser = await userService.createUser(name, email, password_hash);
        res.json({ newUser })

    } catch (error) {
        next(error);
    }
}
const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body
        if (!name || !email) {
            throw new HttpError(`Error al actualizar Usuario, dato faltante`, 304);
        }
        const oldUser = await userService.updateUserById(name, email);
        res.json({ oldUser })

    } catch (error) {
        next(error);
    }
}
const sleepUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.query.email as string;
        const sleepUser = await userService.sleepUserByEmaail(email);
        res.json({ sleepUser })

    } catch (error) {
        next(error);
    }
}


export const userController = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    sleepUserById
}