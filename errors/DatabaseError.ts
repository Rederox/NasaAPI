import { CustomError } from "./CustomError";
import { errorsCodes } from "../constants/errorsCodes";
import { logMessage } from "../constants/logMessage";
import logger from "../logger/logger";

export class DatabaseError extends CustomError {
    constructor(message: string) {
        super(message, errorsCodes.DATABASE_ERROR_CODE);
        this.name = errorsCodes.DATABASE_ERROR_NAME;
        logger.error(`${logMessage.DATABASE_ERROR}, ${message}`);
    }
}