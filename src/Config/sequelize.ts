import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { User, Account, AccountType, Transaction, TransactionType } from "./schema2";
import { HttpError } from "../Utils/httpError.util";


const DATABASE_URL = process.env.CONNECT_DB
if (!DATABASE_URL) {
  throw new HttpError(`DATABASE_URL must be set, ${DATABASE_URL}`, 500);
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Account, AccountType, Transaction, TransactionType],
  // logging: false, // disable logging
});