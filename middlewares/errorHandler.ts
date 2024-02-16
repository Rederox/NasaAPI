import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import logger from "../logger/logger";
import { IncorrectDateError } from "../errors/IncorrectDateError";

// Fonction middleware pour gérer les erreurs dans les applications Express.
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    // Vérifie si l'erreur est une instance de CustomError pour un traitement spécifique.
    if (err instanceof CustomError) {
        // Utilise le logger pour enregistrer l'erreur avec des détails sur la requête.
        logger.error(
            `From : ${req.ip},
            URL : ${req.url},
            Erreur ${err.errorcode} : ${err.message}`
        );
        // Envoie une réponse avec le statut 500 et détails de l'erreur customisée au client.
        res.status(500).json({
            error: err.message,
            errorCode: err.errorcode
        });
    } else {
        // Pour les erreurs non prévues, envoie une réponse générique avec le statut 500.
        res.status(500).json({
            error: "Erreur Inattendue"
        });
    }
}

