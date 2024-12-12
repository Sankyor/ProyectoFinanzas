import { pool } from "../Config/database";
import { User } from "../Interfaces/user.interface";
import { HttpError } from "../Utils/httpError.util";

const findUserById = async (id_user: string) => {
    console.log("findUserById")

    const query = {
        text: `SELECT id_user, name, email, created_at, active  FROM USERS
        WHERE id_user = $1
        `,
        values: [id_user]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as User;
}
const findUserByEmail = async (email: string) => {
    console.log(email)

    const query = {
        text: `SELECT * FROM USERS
        WHERE email = $1 
        `,
        values: [email]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as User;
}

const create = async (name: string, email: string, password_hash: string) => {
    console.log("create");
    const query = {
        text: `INSERT INTO USERS(name, email, password_hash, active)
        VALUES ($1, $2, $3, true)
        RETURNING *`,
        values: [name, email, password_hash]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as User[]
}
const updateUserById = async (name: string, email: string) => {
    const user: User = await findUserByEmail(email)
    if (!user) throw new HttpError(`No se encontro el usuario`, 304);

    const query = {
        text: `UPDATE USERS SET name = $2, email = $3
        WHERE ID_USER = $1
        RETURNING *`,
        values: [user.id_user, name, email]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as User[]
}
const sleepUserByEmaail = async (email: string) => {
    console.log("create");
    const query = {
        text: `UPDATE USERS SET active = false
        WHERE email = $1
        RETURNING *`,
        values: [email]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as User[]
}
export const UserModel = {
    findUserById,
    findUserByEmail,
    create,
    updateUserById,
    sleepUserByEmaail
}