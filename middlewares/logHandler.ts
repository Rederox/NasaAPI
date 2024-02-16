import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

// Fonction middleware pour logger les requêtes entrantes.
export function logRequest(req: Request, res: Response, next: NextFunction): void {
  // Récupère la méthode HTTP et l'URL de la requête.
  const { method, url } = req;
  // Récupère l'adresse IP du client.
  const clientIp = req.ip;
  // Utilise le logger pour enregistrer les détails de la requête entrante.
  logger.info(`Requête entrante - Méthode: ${method}, URL: ${url}, IP: ${clientIp}`);
  next();
}

// Fonction middleware pour logger les réponses sortantes avec leur durée d'exécution.
export function logResponse(req: Request, res: Response, next: NextFunction): void {
  // Enregistre le moment du début de la requête pour calculer sa durée.
  const start = process.hrtime();
  // Ajoute un gestionnaire d'événements pour l'événement 'finish' de la réponse.
  res.on('finish', () => {
    // Calcule la durée de la requête en millisecondes.
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    // Utilise le logger pour enregistrer le statut de la réponse et sa durée.
    logger.info(`Réponse sortante - Statut: ${res.statusCode}, Durée: ${duration}ms`);
  });
  next();
}