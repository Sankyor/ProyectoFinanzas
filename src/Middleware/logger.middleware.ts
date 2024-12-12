import { NextFunction, Request, Response } from "express";
import logger from "../Utils/logger.utils";

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("loggerMiddleware")
    logger.info(`${req.url} ${req.method}`);
    next();
};
