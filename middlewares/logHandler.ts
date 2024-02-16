import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

export function logRequest(req: Request, res: Response, next: NextFunction): void {
  const { method, url } = req;
  const clientIp = req.ip;
  logger.info(`Requête entrante - Méthode: ${method}, URL: ${url}, IP: ${clientIp}`);
  next();
}

export function logResponse(req: Request, res: Response, next: NextFunction): void {
  const start = process.hrtime();
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    logger.info(`Réponse sortante - Statut: ${res.statusCode}, Durée: ${duration}ms`);
  });
  next();
}