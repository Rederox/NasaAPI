import { errorsCodes } from "../constants/errorsCodes";

export class CustomError extends Error {
  errorcode: number;

  constructor(message: string,
    errorcode: number = errorsCodes.CUSTOM_ERROR_CODE,
    name: string = errorsCodes.CUSTOM_ERROR_NAME) {
      super(message);
      this.name = name;
      this.errorcode = errorcode;
  }
}