import { Account } from "../Config/schema2";
import logger from "../Utils/logger.utils";
import { iAccount } from "./account.interface";



const getAllAccountsByUser = async (id_user: string) => {
    logger.info("account.service-getAllAccountsByUser");

    const accounts = await Account.findAll({
        where: {
            id_user: id_user,
        },
    });
    return accounts;
}
const getAccountById = async (id_account: string) => {
    logger.info("account.service-getAccountById");

    const accounts = await Account.findByPk(id_account);
    return accounts?.get();
}

const createAccount = async (id_user: string, account: Account) => {
    logger.info("account.service-createAccount");
    logger.info(`datos de la cuenta ${JSON.stringify(account)}`);;
    logger.info(`name ${account.name}`);;

    const newAccount = await Account.create({
        id_user: id_user,
        name: account.name,
        id_account_type: account.id_account_type,
        balance: account.balance,
        credit_limit: account.credit_limit,
        due_date: account.due_date
    });
    return newAccount.get();
}
const updateAllOfOneById = async (account: iAccount) => {
    logger.info("account.service-updateAllOfOneById");

    const oldAccount = await Account.update(
        {
            name: account.name,
            id_account_type: account.id_account_type,
            balance: account.balance,
            credit_limit: account.credit_limit,
            due_date: account.due_date
        },
        {
            where: {
                id_account: account.id_account
            },
        }
    );

    return oldAccount;
}
const DeleteById = async (id_account: string) => {
    logger.info("account.service-DeleteById");

    const dieAccount = await Account.destroy({
        where: {
            id_account: id_account,
        },
    });

    return dieAccount;
}

export const AccountService = {
    getAllAccountsByUser,
    getAccountById,
    createAccount,
    updateAllOfOneById,
    DeleteById
}