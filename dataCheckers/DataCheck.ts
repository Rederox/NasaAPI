import { IncorrectDateError } from "../errors/IncorrectDateError";
import { NotIntegerError } from "../errors/NotIntegerError";
import { errorsCodes } from "../constants/errorsCodes";
import { NextFunction } from "express";

export class DataCheck{

    public static checkDate(date: string, next : NextFunction): void {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if(!date.match(dateRegex)) {
            next(new IncorrectDateError(errorsCodes.INCORRECT_DATE_ERROR_MESSAGE));
        }
    }
    
    public static checkInteger(number: number, next : NextFunction): void {
        if(!Number.isInteger(number)) {
            next(new NotIntegerError(errorsCodes.NOT_INTEGER_ERROR_MESSAGE));
        }
    }
}

