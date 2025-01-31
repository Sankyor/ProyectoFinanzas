//** El controller es quién le responde al cliente!

import { NextFunction, Request, Response } from "express"
import { HttpError } from "../Utils/httpError.util";
import moment from 'moment-timezone';
import logger from "../Utils/logger.utils";
import { AccountService } from "./account.service";



const getAccountsByUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-getAccountsByUser");
    const id_user = req.user;

    try {
        //necesito obtener el token del usuario para poder buscar su id
        const accounts = await AccountService.getAllAccountsByUser(id_user)

        res.json(accounts)
    } catch (error) {
        next(error);
    }
}
const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-getAccountById");

    try {
        const { id_account } = req.params;
        console.log(req.params)
        const account = await AccountService.getAccountById(id_account)
        res.json(account)
    } catch (error) {
        next(error);
    }
}

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-createAccount");
    const id_user = req.user;

    try {
        const { name, id_account_type, balance, credit_limit, due_date } = req.body
        if (!id_user || !name || !id_account_type || !balance || !credit_limit || !due_date) {
            throw new HttpError(`Error al agregar Cuenta, dato faltante`, 304);

        }
        //how i can fix time zone "gmt-0300" not recognized
        const formattedDate = moment.tz(due_date, 'America/Argentina/Buenos_Aires').toDate();
        req.body.due_date = formattedDate;
        // Usa formattedDate para guardar en la base de datos


        console.log(req.body.due_date)
        const newAccount = await AccountService.createAccount(id_user, req.body);
        res.json({ newAccount })

    } catch (error) {
        next(error);
    }
}
const updateAllOfOneById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-updateAllOfOneById");
    const id_user = req.user;

    try {
        const { name, id_account_type, balance, credit_limit, due_date } = req.body
        if (!id_user || !name || !id_account_type || !balance || !credit_limit || !due_date) {
            throw new HttpError(`Error al agregar Cuenta, dato faltante`, 304);

        }
        const oldAccount = await AccountService.updateAllOfOneById(req.body);
        res.json({ oldAccount })

    } catch (error) {
        next(error);
    }
}
const DeleteById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("account.controller-DeleteById");

    try {
        const { id_account } = req.params
        const dieAccount = await AccountService.DeleteById(id_account);
        res.json({ dieAccount })

    } catch (error) {
        next(error);
    }
}

export const AccountController = {
    getAccountsByUser,
    getAccountById,
    createAccount,
    updateAllOfOneById,
    DeleteById
}