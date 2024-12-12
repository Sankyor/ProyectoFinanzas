import { TransactionModel } from "../Models/transaction.model";
import { Transaction } from "../Interfaces/transaction.interface";

const getAllTransactionsByUser = async (id_user: string) => {
    const transactions = await TransactionModel.findAllByUser(id_user);
    return transactions;
}
const getTransactionById = async (id_transaction: string) => {
    const transactions = await TransactionModel.findOneById(id_transaction);
    return transactions;
}

const createTransaction = async (transaction: Transaction) => {
    const newTransaction = await TransactionModel.create(transaction);

    return newTransaction;
}
const updateAllOfOneById = async (transaction: Transaction) => {
    const oldTransaction = await TransactionModel.updateAllOfOneById(transaction);

    return oldTransaction;
}
const DeleteById = async (id_transaction: string) => {
    const dieTransaction = await TransactionModel.DeleteById(id_transaction);

    return dieTransaction;
}

export const TransactionService = {
    getAllTransactionsByUser,
    getTransactionById,
    createTransaction,
    updateAllOfOneById,
    DeleteById

}