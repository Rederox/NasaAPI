import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import logger from "../logger/logger";
import { IncorrectDateError } from "../errors/IncorrectDateError";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof CustomError) {
        logger.error(
            `From : ${req.ip},
            URL : ${req.url},
            Erreur ${err.errorcode} : ${err.message}`
        );
        res.status(500).json({
            error: err.message,
            errorCode: err.errorcode
        });
    } else {
        res.status(500).json({
            error: "Erreur Inattendue"
        });
    }
}


