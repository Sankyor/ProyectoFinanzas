import { pool } from "../Config/database";
import { Transaction } from "../c_transaction/transaction.interface";

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
    const { id_user, id_account, id_transaction_type, amount, transaction_date } = transaction
    const query = {
        text: `INSERT INTO TRANSACTIONS(id_user, id_account, id_transaction_type, amount, transaction_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        values: [id_user, id_account, id_transaction_type, amount, transaction_date]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Transaction[]
}
const updateAllOfOneById = async (transaction: Transaction) => {
    console.log("create");
    const { id_user, id_account, id_transaction_type, amount, transaction_date, description } = transaction
    const query = {
        text: `UPDATE TRANSACTIONS SET id_account = $2, id_transaction_type = $3, amount = $4, 
        transaction_date = $5, description = $6
        WHERE ID_USER = $1
        RETURNING *`,
        values: [id_user, id_account, id_transaction_type, amount, transaction_date, description]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Transaction[]
}
const DeleteById = async (id_transaction: string) => {
    console.log("create");
    const query = {
        text: `DELETE FROM TRANSACTIONS WHERE ID_TRANSACTION = $1
        RETURNING *`,
        values: [id_transaction]
    }

    const { rows } = await pool.query(query)
    console.log(rows)
    return rows as Transaction[]
}

export const TransactionModel = {
    create,
    findOneById,
    findAllByUser,
    updateAllOfOneById,
    DeleteById
}