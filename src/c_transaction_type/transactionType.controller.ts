//** El controller es quién le responde al cliente!

import { NextFunction, Request, Response } from "express"
import logger from "../Utils/logger.utils";
import { TransactionTypeService } from "./transactionType.service";



const getTransactionType = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-getTransactionByUser");

    try {
        //necesito obtener el token del usuario para poder buscar su id
        const transactionType = await TransactionTypeService.getTransactionType();

        res.json(transactionType)
    } catch (error) {
        next(error);
    }
}
const getTransactionTypeById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("transaction.controller-getTransactionById");

    try {
        const { id_transaction } = req.params;
        console.log(req.params)
        const transactionType = await TransactionTypeService.getTransactionTypeById(id_transaction)
        res.json(transactionType)
    } catch (error) {
        next(error);
    }
}

export const TransactionTypeController = {
    getTransactionType,
    getTransactionTypeById
}