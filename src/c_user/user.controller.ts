import { Request, Response, NextFunction } from "express"
import { userService } from "./user.service"
import { HttpError } from "../Utils/httpError.util";
import logger from "../Utils/logger.utils";


const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("user.controller-getUserById");

    try {
        const { id_user } = req.params;
        const user = await userService.getUserById(id_user)
        if (!user) throw new HttpError(`No se encuentra el usuario`, 400);

        res.json(user)
    } catch (error) {
        next(error);
    }
}
const getUserByIdLoged = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("user.controller-getUserById");
    const id_user = req.user;
    if (!id_user) throw new HttpError(`No se encuentra el usuario`, 400);
    try {
        const user = await userService.getUserById(id_user)
        if (!user) throw new HttpError(`No se encuentra el usuario`, 400);

        res.json(user)
    } catch (error) {
        next(error);
    }
}
const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("user.controller-getUserByEmail");

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
    logger.info("user.controller-createUser");

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
    logger.info("user.controller-updateUserById");
    const id_user = req.user;

    try {
        const { name, email } = req.body
        if (!name || !email) {
            throw new HttpError(`Error al actualizar Usuario, dato faltante`, 304);
        }
        const oldUser = await userService.updateUserById(id_user, name, email);
        res.json({ oldUser })

    } catch (error) {
        next(error);
    }
}
const sleepUserById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("user.controller-sleepUserById");
    const id_user = req.user;
    try {
        const usuario = await userService.getUserById(id_user);
        logger.info(`usuario:  ${JSON.stringify(usuario)}`);

        if (!usuario || usuario.active === false) {
            throw new HttpError(`Usuario no encontrado o inactivo`, 400);
        }
        const sleepUser = await userService.sleepUserByIdLoged(id_user);
        if (sleepUser[0] === 0) throw new HttpError(`Usuario no modificado`, 400);
        res.json({ sleepUser })

    } catch (error) {
        next(error);
    }
}


export const userController = {
    getUserById,
    getUserByIdLoged,
    getUserByEmail,
    createUser,
    updateUserById,
    sleepUserById
}