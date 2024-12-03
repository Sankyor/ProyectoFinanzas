import express from 'express';
import userRouter from './Routes/user.route';
import authRoute from "./Routes/auth.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor andando en el puerto: " + port);
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRoute);

// Función para escribir usuarios en el archivo JSON

