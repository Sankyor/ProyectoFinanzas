import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { authLoginSchema, authRegisterSchema } from "./auth.schema";
import { HttpError } from "../Utils/httpError.util";
import logger from "../Utils/logger.utils";


//api/v1/auth/login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = authLoginSchema.validate(req.body);
    console.log(value)
    logger.info(`User ${value.email}, ${value.password} has logged in`);

    if (error) {
      throw new HttpError("Los datos ingresados no cumplen los requisitos", 400);
    }
    const { email, password, active } = value;
    if (active === false) {
      throw new HttpError("Usuario no activo", 400);
    }
    const token = await authService.loginWithEmailAndPassword(email, password)
    logger.info(`User ${email} has logged in`);

    res.json({ token });

  } catch (error) {
    next(error);
  }
};

//api/v1/auth/register
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = authRegisterSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    const { name, password } = value;
    const {email} = req.body;
    
 

    const token = await authService.registerWithEmailAndPassword(
      name,
      email,
      password
    );
    logger.info(`User ${email} registered`);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
  register,
};
