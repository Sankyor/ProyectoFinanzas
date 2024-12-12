import { Account } from "../Interfaces/account.interface";
import { AccountModel } from "../Models/account.model";


const getAllAccountsByUser = async (id_user: string) => {
    const accounts = await AccountModel.findAllByUser(id_user);
    return accounts;
}
const getAccountById = async (id_account: string) => {
    const accounts = await AccountModel.findOneById(id_account);
    return accounts;
}

const createAccount = async (account: Account) => {
    const newAccount = await AccountModel.create(account);
    return newAccount;
}
const updateAllOfOneById = async (account: Account) => {
    const oldAccount = await AccountModel.updateAllOfOneById(account);

    return oldAccount;
}
const DeleteById = async (id_account: string) => {
    const dieAccount = await AccountModel.DeleteById(id_account);

    return dieAccount;
}

export const AccountService = {
    getAllAccountsByUser,
    getAccountById,
    createAccount,
    updateAllOfOneById,
    DeleteById
}