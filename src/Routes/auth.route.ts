import { Router } from "express";

import { authController } from "../Controllers/auth.controller";

const router = Router();

router.post("/login", authController.login)
/* {
    "email": "UsuarioCorrecto@mail.com",
    "password": "claveCorrecta"
  } */
router.post("/register", authController.register);
/* {
    "name": "Nicolas",
    "email": "UsuarioCorrecto@mail.com",
    "password": "claveCorrecta"
  } */

export default router