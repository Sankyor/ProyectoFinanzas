import express from 'express';
import userRouter from './Routes/user.route';
import authRoute from "./Routes/auth.route";
import transactionRoute from "./Routes/transaction.route";
import accountRouter from "./Routes/account.route";
import { loggerMiddleware } from "./Middleware/logger.middleware";
import { httpErrorHandle } from './Middleware/httpErrorHandler.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/account", accountRouter);
app.use(httpErrorHandle);

export default app;

