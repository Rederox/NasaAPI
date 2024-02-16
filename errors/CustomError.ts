import { errorsCodes } from "../constants/errorsCodes";

export class CustomError extends Error {
private errorcode: number;

  constructor(message: string, errorcode: number) {
    super(message);
    this.name = errorsCodes.CUSTOM_ERROR_NAME;
    this.errorcode = errorsCodes.CUSTOM_ERROR_CODE;
  }
}