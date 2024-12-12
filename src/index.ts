import express from 'express';
import userRouter from './Routes/user.route';
import authRoute from "./Routes/auth.route";
import transactionRoute from "./Routes/transaction.route";
import accountRouter from "./Routes/account.route";
import { pool } from './Config/database';
import { loggerMiddleware } from "./Middleware/logger.middleware";
import { httpErrorHandle } from './Middleware/httpErrorHandler.middleware';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(loggerMiddleware);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/account", accountRouter);
app.use(httpErrorHandle);



// app.listen(port, () => {
//   console.log("Servidor andando en el puerto: " + port);
// });
const main = async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(rows[0].now, "db conectada!");
    app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

