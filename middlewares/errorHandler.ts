import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
// export class WeatherError extends Error {
//   // constructor(message: string) {
//   //   super(message);
//   //   this.name = "WeatherError";
//   // }
// }


export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof CustomError) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Erreur inattendue" });
  }
}
