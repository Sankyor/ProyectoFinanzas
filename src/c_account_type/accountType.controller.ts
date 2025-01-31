//** El controller es quién le responde al cliente!

import { NextFunction, Request, Response } from "express"
import logger from "../Utils/logger.utils";
import { AccountTypeService } from "./accountType.service";



const getAccountsType = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-getAccountsByUser");

    try {
        //necesito obtener el token del usuario para poder buscar su id
        const accountsType = await AccountTypeService.getAccountsType();

        res.json(accountsType)
    } catch (error) {
        next(error);
    }
}
const getAccountTypeById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-getAccountById");

    try {
        const { id_account } = req.params;
        console.log(req.params)
        const accountType = await AccountTypeService.getAccountTypeById(id_account)
        res.json(accountType)
    } catch (error) {
        next(error);
    }
}

export const AccountTypeController = {
    getAccountsType,
    getAccountTypeById
}