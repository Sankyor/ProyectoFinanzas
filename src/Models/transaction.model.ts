import { pool } from "../Config/database";
import { Transaction } from "../Interfaces/transaction.interface";

const findOneById = async (id_transaction: string) => {
    console.log("findOneById")

    const query = {
        text: `SELECT * FROM TRANSACTIONS
        WHERE id_transaction = $1
        `,
        values: [id_transaction]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as Transaction;
}
const findAllByUser = async (id_user: string) => {
    console.log("findAllByUser")

    const query = {
        text: `SELECT * FROM TRANSACTIONS
        WHERE id_user = $1
        `,
        values: [id_user]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows[0] as Transaction;
}

const create = async (transaction: Transaction) => {
    console.log("create");
    const { id_user, id_account, id_category, amount, transaction_date } = transaction
    const query = {
        text: `INSERT INTO TRANSACTIONS(id_user, id_account, id_category, amount, transaction_date, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        values: [id_user, id_account, id_category, amount, transaction_date, Date()]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Transaction[]
}

export const TransactionModel = {
    create,
    findOneById,
    findAllByUser
}