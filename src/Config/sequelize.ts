
import { Sequelize } from "sequelize-typescript";
import { Post, User } from "./schema";

const DATABASE_URL = "postgres://postgres:root@localhost:5436/db_corfo";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Post],
  // logging: false, // disable logging
});
