

import { HttpError } from "../Utils/httpError.util";
import bcrypt from "bcryptjs";
import { User } from "../Config/schema2";
import logger from "../Utils/logger.utils";



const getUserById = async (id_user: string) => {
    logger.info("user.service-getUserById");

    const user = await User.findByPk(id_user);
    return user?.get();
}
const getUserByEmail = async (email: string) => {
    logger.info("user.service-getUserByEmail");
    const user = await User.findOne({
        where: {
            email: email,
        },
        attributes: { exclude: ['password_hash'] },
    });
    return user?.get();
}
const getUserByEmailLogin = async (email: string) => {
    logger.info("user.service-getUserByEmailLogin");
    const user = await User.findOne({
        where: {
            email: email,
        },
        attributes: ['id_user', 'email', 'active', 'password_hash'],
    });
    return user?.get();
}

const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    const user = await getUserByEmail(email);
    logger.info("user.service-createUser");

    if (user) {
        throw new HttpError("Email already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name: name,
        email: email,
        password_hash: passwordHashed,
        active: true,
    });
    logger.info(`Usuario creado: ${JSON.stringify(newUser.get())}`);
    return newUser.get();
}


const updateUserById = async (id_user: string, name: string, email: string) => {
    logger.info("user.service-updateUserById");
    const oldUser = await User.update(
        { name: name, active: true, email: email },
        {
            where: {
                id_user: id_user,
            },
        }
    );
    return oldUser;
}

const sleepUserByIdLoged = async (id_user: string) => {
    logger.info(`user.service-sleepUserByIdLoged, id_user: ${id_user}`);
    const sleepUser = await User.update(
        { active: false },
        {
            where: {
                id_user: id_user,
            },
        }
    );

    return sleepUser;

}

export const userService = {
    getUserByEmailLogin,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    sleepUserByIdLoged
}
