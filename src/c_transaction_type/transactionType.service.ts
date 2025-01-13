import { TransactionType } from "../Config/schema2";
import logger from "../Utils/logger.utils";



const getTransactionType = async () => {
    logger.info("transactionType.service-getTransactionsType");
    const transactionsType = await TransactionType.findAll();
    return transactionsType;
}
const getTransactionTypeById = async (id_transaction_type: string) => {
    logger.info("transactionType.service-getTransactionTypeById");

    const transactionType = await TransactionType.findByPk(id_transaction_type);
    return transactionType?.get();
}



export const TransactionTypeService = {
    getTransactionType,
    getTransactionTypeById,
}