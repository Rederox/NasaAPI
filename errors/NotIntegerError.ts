import { CustomError } from "./CustomError";
import { errorsCodes } from "../constants/errorsCodes";

export class NotIntegerError extends CustomError {
    constructor(message: string) {
        super(message, errorsCodes.NOT_INTEGER_ERROR_CODE, errorsCodes.NOT_INTEGER_ERROR_NAME);
    }
}