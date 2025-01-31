import { NextFunction, Request, Response } from "express";
import { HttpError } from "../Utils/httpError.util";
import logger from "../Utils/logger.utils";

export const httpErrorHandle = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("httpErrorHandle")
    console.log(error);
    logger.error(error.message)
    if (error instanceof HttpError) {
        res.status(error.code).json({ error: error.message });
    } else res.status(500).json({ error: "Error de servidor" });
};
