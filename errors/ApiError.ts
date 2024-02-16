import { CustomError } from "./CustomError";
import { errorsCodes } from "../constantes/errorsCodes";
import { logMessage } from "../constantes/logMessage";
import { errorLogger } from "../logs/logger";

export class ApiError extends CustomError {
    constructor(message: string) {
        super(message, errorsCodes.API_ERROR_CODE);
        this.name = errorsCodes.API_ERROR_NAME;
        errorLogger.error(`${logMessage.API_ERROR}, ${message}`);
    }
}