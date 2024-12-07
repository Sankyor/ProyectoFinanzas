import { TransactionModel } from "../Models/transaction.model";
import { Transaction } from "../Interfaces/transaction.interface";

const getAllTransactionsByUser = async (id_user: string) => {
    const transactions = await TransactionModel.findAllByUser(id_user);
    return transactions;
}
const getAllTransactionsById = async (id_transaction: string) => {
    const transactions = await TransactionModel.findOneById(id_transaction);
    return transactions;
}


const createTransaction = async (transaction: Transaction) => {
    const newTransaction = await TransactionModel.create(transaction);

    return newTransaction;
}

export const TransactionService = {
    getAllTransactionsByUser,
    getAllTransactionsById,
    createTransaction
}