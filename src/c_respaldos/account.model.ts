import { pool } from "../Config/database";
import { Account } from "../c_account/account.interface";


const findOneById = async (id_account: string) => {
    console.log("findOneById")

    const query = {
        text: `SELECT * FROM ACCOUNTS
        WHERE id_account = $1
        `,
        values: [id_account]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as Account;
}
const findAllByUser = async (id_user: string) => {
    console.log("findAllByUser")

    const query = {
        text: `SELECT * FROM ACCOUNTS
        WHERE id_user = $1
        `,
        values: [id_user]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as Account;
}

const create = async (account: Account) => {
    console.log("create");
    const { id_user, name, id_account_type, balance, credit_limit, due_date } = account
    const query = {
        text: `INSERT INTO ACCOUNTS(id_user, name, id_account_type, balance, credit_limit, due_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        values: [id_user, name, id_account_type, balance, credit_limit, due_date]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Account[]
}
const updateAllOfOneById = async (account: Account) => {

    const { id_account, name, id_account_type, balance, credit_limit, due_date } = account
    const query = {
        text: `UPDATE ACCOUNTS SET name = $2, id_account_type = $3, balance = $4, 
        credit_limit = $5, due_date = $6
        WHERE ID_ACCOUNT = $1
        RETURNING *`,
        values: [id_account, name, id_account_type, balance, credit_limit, due_date]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Account[]
}
const DeleteById = async (id_account: string) => {
    console.log("create");
    const query = {
        text: `DELETE FROM ACCOUNTS WHERE ID_ACCOUNT = $1
        RETURNING *`,
        values: [id_account]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Account[]
}

export const AccountModel = {
    create,
    findOneById,
    findAllByUser,
    updateAllOfOneById,
    DeleteById
}