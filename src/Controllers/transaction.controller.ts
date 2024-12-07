//** El controller es quién le responde al cliente!

import { Request, Response } from "express"
import { TransactionModel } from "../Models/transaction.model";

const getTransactionsByUser = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.body;
        const transaction = await TransactionModel.findAllByUser(id_user)
        res.json(transaction)
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })

        } else res.status(500).json({ error: "Error de servidor" })
    }
}
const getTransactionById = async (req: Request, res: Response) => {
    try {
        const { id_transaction } = req.body;
        const transaction = await TransactionModel.findOneById(id_transaction)
        res.json(transaction)
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else res.status(500).json({ error: "Error de servidor" })
    }
}

const createTransaction = async (req: Request, res: Response) => {
    try {
        const { id_user, id_account, id_category, amount, transaction_date } = req.body
        if (!id_user || !id_account || !id_category || !amount || !transaction_date) {
            res.status(304).json({ error: "Error de servidor" })
            throw new Error("Error al agregar transaccion, dato faltante")
        }
        const newTransaction = await TransactionModel.create(req.body);
        res.json({ newTransaction })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
            return;
        }
        res.status(500).json({ error: "Error de servidor" })
    }
}

export const TransactionController = {
    getTransactionsByUser,
    getTransactionById,
    createTransaction
}