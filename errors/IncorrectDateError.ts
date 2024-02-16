import { CustomError } from "./CustomError";
import { errorsCodes } from "../constants/errorsCodes";

export class IncorrectDateError extends CustomError {
    constructor(message: string) {
        super(message, errorsCodes.INCORRECT_DATE_ERROR_CODE, errorsCodes.INCORRECT_DATE_ERROR_NAME);
    }
}