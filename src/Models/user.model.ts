import { pool } from "../Config/database";
import { User } from "../Interfaces/user.interface";

const findUserById = async (id_user: string) => {
    console.log("findUserById")

    const query = {
        text: `SELECT * FROM USERS
        WHERE id_user = $1
        `,
        values: [id_user]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as User;
}
const findUserByEmail = async (email: string) => {
    console.log("findUserByEmail")

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

const create = async (user: User) => {
    console.log("create");
    const { name, email, password_hash, created_at } = user
    const query = {
        text: `INSERT INTO TRANSACTIONS(name, email, password_hash, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        values: [name, email, password_hash, created_at, Date()]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as User[]
}

export const UserModel = {
    findUserById,
    findUserByEmail,
    create
}