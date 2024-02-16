import { IncorrectDateError } from "../errors/IncorrectDateError";
import { NotIntegerError } from "../errors/NotIntegerError";
import { errorsCodes } from "../constants/errorsCodes";
import { NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export class DataCheck {

    // Méthode statique pour vérifier si une date est au format AAAA-MM-JJ.
    public static checkDate(date: string, next: NextFunction): void {
        // Expression régulière pour valider le format de la date.
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        // Vérifie si la date correspond au format attendu.
        if (!date.match(dateRegex)) {
            // Si la date ne correspond pas, déclenche une erreur via le middleware de gestion d'erreurs.
            next(new IncorrectDateError(errorsCodes.INCORRECT_DATE_ERROR_MESSAGE));
        }
    }

    // Méthode statique pour vérifier si un nombre est un entier.
    public static checkInteger(number: number, next: NextFunction): void {
        // Utilise Number.isInteger pour vérifier si le paramètre est un entier.
        if (!Number.isInteger(number)) {
            // Si le nombre n'est pas un entier, déclenche une erreur via le middleware de gestion d'erreurs.
            next(new NotIntegerError(errorsCodes.NOT_INTEGER_ERROR_MESSAGE));
        }
    }

    // Méthode statique pour vérifier l'absence de paramètres obligatoires.
    public static checkParametersMissing(parameters: string[], next: NextFunction): void {
        // Vérifie si le tableau de paramètres contient au moins une chaîne vide, indiquant un paramètre manquant.
        if (parameters.includes('')) {
            // Si un paramètre est manquant, déclenche une erreur personnalisée via le middleware de gestion d'erreurs.
            next(new CustomError(errorsCodes.PARMETERS_MISSING_ERROR_MESSAGE, errorsCodes.PARMETERS_MISSING_ERROR_CODE, errorsCodes.PARMETERS_MISSING_ERROR_NAME));
        }
    }


}

