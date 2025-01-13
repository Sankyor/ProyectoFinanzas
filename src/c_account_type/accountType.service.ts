import { AccountType } from "../Config/schema2";
import logger from "../Utils/logger.utils";



const getAccountsType = async () => {
    logger.info("accountType.service-getAccountsType");
    const accountsType = await AccountType.findAll();
    return accountsType;
}
const getAccountTypeById = async (id_account_type: string) => {
    logger.info("accountType.service-getAccountTypeById");

    const accountType = await AccountType.findByPk(id_account_type);
    return accountType?.get();
}



export const AccountTypeService = {
    getAccountsType,
    getAccountTypeById,
}