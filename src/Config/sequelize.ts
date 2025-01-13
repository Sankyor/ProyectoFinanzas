
import { Sequelize } from "sequelize-typescript";
import { User, Account, AccountType, Transaction, TransactionType } from "./schema2";


const DATABASE_URL = "postgres://postgres:admin@localhost:5435/BudgetZero";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Account, AccountType, Transaction, TransactionType],
  // logging: false, // disable logging
});