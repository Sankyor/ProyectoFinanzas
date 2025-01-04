import "dotenv/config";
import app from "./app";
import { pool } from "./Config/database";
import { sequelize } from "./config/sequelize";


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

    app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

