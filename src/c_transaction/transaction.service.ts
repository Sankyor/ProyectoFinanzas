import { Transaction } from "../Config/schema2";
import logger from "../Utils/logger.utils";
import { iTransaction } from "./transaction.interface";

const getAllTransactionsByUser = async (id_user: string) => {
    logger.info("transaction.service-getAllTransactionsByUser");

    const transactions = await Transaction.findAll({
        where: {
            id_user: id_user,
        },
    });
    return transactions;
}
const getTransactionById = async (id_transaction: string) => {
    logger.info("transaction.service-getTransactionById");

    const transactions = await Transaction.findByPk(id_transaction);
    return transactions;
}

const createTransaction = async (id_user: string, transaction: iTransaction) => {
    const newTransaction = await Transaction.create({
        id_user: id_user,
        id_account: transaction.id_account,
        id_transaction_type: transaction.id_transaction_type,
        amount: transaction.amount,
        transaction_date: transaction.transaction_date

    });
    return newTransaction;
}

const updateAllOfOneById = async (transaction: iTransaction) => {
    logger.info("transaction.service-updateAllOfOneById");

    const oldTransaction = await Transaction.update(
        {
            id_account: transaction.id_account,
            id_transaction_type: transaction.id_transaction_type,
            amount: transaction.amount,
            transaction_date: transaction.transaction_date
        },
        {
            where: {
                id_transaction: transaction.id_transaction
            },
        }
    );
    return oldTransaction;
}
const DeleteById = async (id_transaction: string) => {
    logger.info("transaction.service-DeleteById");

    const dieTransaction = await Transaction.destroy({
        where: {
            id_transaction: id_transaction,
        },
    });

    return dieTransaction;
}

export const TransactionService = {
    getAllTransactionsByUser,
    getTransactionById,
    createTransaction,
    updateAllOfOneById,
    DeleteById

}