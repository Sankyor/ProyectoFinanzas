import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { authLoginSchema } from "./auth.schema";
import { HttpError } from "../Utils/httpError.util";
import logger from "../Utils/logger.utils";
import { userService } from "../c_user/user.service";


//api/v1/auth/login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = authLoginSchema.validate(req.body);
    console.log(value)

    if (error) {
      throw new HttpError(error.message, 400);
    }
    const { email, password } = value;

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
    const { name, email, password } = req.body;
    const token = await userService.createUser(
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
