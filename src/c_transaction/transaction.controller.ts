//** El controller es quién le responde al cliente!

import { NextFunction, Request, Response } from "express"
import { TransactionService } from "./transaction.service";
import { HttpError } from "../Utils/httpError.util";
import moment from "moment";
import logger from "../Utils/logger.utils";

const getTransactionsByUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-getTransactionsByUser");
    const id_user = req.user;
    if (!id_user) throw new HttpError(`No se encuentra el usuario`, 400);
    try {
        const transaction = await TransactionService.getAllTransactionsByUser(id_user)
        res.json(transaction)
    } catch (error) {
        next(error);
    }
}
const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-getTransactionById");

    try {
        const { id_transaction } = req.params;
        const transaction = await TransactionService.getTransactionById(id_transaction)
        res.json(transaction)
    } catch (error) {
        next(error);
    }
}

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-createTransaction");
    const id_user = req.user;

    try {
        const { id_account, id_transaction_type, amount, transaction_date } = req.body
        if (!id_user || !id_account || !id_transaction_type || !amount || !transaction_date) {
            throw new HttpError(`Error al agregar Usuario, dato faltante`, 304);

        }
        const formattedDate = moment.tz(transaction_date, 'America/Argentina/Buenos_Aires').toDate();
        req.body.due_date = formattedDate;
        const newTransaction = await TransactionService.createTransaction(id_user, req.body);
        res.json({ newTransaction })

    } catch (error) {
        next(error);
    }
}
const updateAllOfOneById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-updateAllOfOneById");
    const id_user = req.user;

    try {
        const { id_account, id_transaction_type, amount, transaction_date } = req.body
        if (!id_user || !id_account || !id_transaction_type || !amount || !transaction_date) {
            throw new HttpError(`Error al agregar Usuario, dato faltante`, 304);
        }
        const formattedDate = moment.tz(transaction_date, 'America/Argentina/Buenos_Aires').toDate();
        req.body.due_date = formattedDate;
        const oldTransaction = await TransactionService.updateAllOfOneById(req.body);
        res.json({ oldTransaction })

    } catch (error) {
        next(error);
    }
}
const DeleteById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-DeleteById");

    try {
        const { id_transaction } = req.params
        const dieTransaction = await TransactionService.DeleteById(id_transaction);
        res.json({ dieTransaction })

    } catch (error) {
        next(error);
    }
}

export const TransactionController = {
    getTransactionsByUser,
    getTransactionById,
    createTransaction,
    updateAllOfOneById,
    DeleteById
}