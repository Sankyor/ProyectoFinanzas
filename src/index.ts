import "dotenv/config";
import app from "./app";
import { sequelize } from "./Config/sequelize";
import { insertTransactionType } from "./Config/TransactionType"
import { insertAccountType } from "./Config/accountTypes"
import { HttpError } from "./Utils/httpError.util";

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("Servidor andando en el puerto: " + port);
// });
const main = async () => {
  try {
    // const { rows } = await pool.query("SELECT NOW()");
    // console.log(rows[0].now, "db conectada!");
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    console.log("Database conectada");

    const server = app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        throw new HttpError(`El puerto ${port} ya está en uso`, 500);
      } else {
        console.log("Error inesperado:", err);

      }
    });
  } catch (error) {
    console.log(error);
  }
};

await insertAccountType();
await insertTransactionType();
main();

