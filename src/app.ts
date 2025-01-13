import express from 'express';
import userRouter from './c_user/user.route';
import authRoute from "./c_auth/auth.route";
import transactionRoute from "./c_transaction/transaction.route";
import transactionTypeRoute from "./c_transaction_type/transactionType.route";
import accountRoute from "./c_account/account.route";
import accountTypeRoute from "./c_account_type/accountType.route";
import { loggerMiddleware } from "./Middleware/logger.middleware";
import { httpErrorHandle } from './Middleware/httpErrorHandler.middleware';

import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./Config/swagger";


const app = express();
app.use(
    "/api/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/transactiontype", transactionTypeRoute);
app.use("/api/v1/accounttype", accountTypeRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/account", accountRoute);
app.use(httpErrorHandle);

export default app;

