import { CustomError } from "./CustomError";
import { errorsCodes } from "../constants/errorsCodes";

export class ApiError extends CustomError {
    constructor(message: string) {
        super(message, errorsCodes.API_ERROR_CODE, errorsCodes.API_ERROR_NAME);
    }
}