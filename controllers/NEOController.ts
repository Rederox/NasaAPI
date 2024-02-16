import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { url } from '../constants/url';
import { SimplifiedNeoData } from '../interfaces/NEO';
import { ApiError } from '../errors/ApiError';
import { errorsCodes } from '../constants/errorsCodes';
import { CustomError } from '../errors/CustomError';
import { DataCheck } from '../dataCheckers/dataCheck';

/**
 * @swagger
 * tags:
 *  name: Neo
 *  description: Near Earth Object
 */

export class NEOController {

    /**
     * @swagger
     *  /neo/{startDate}/{endDate}:
     *   get:
     *     summary: Récupère les NEO pour une période spécifique.
     *     description: Récupère les NEO pour une période spécifique.
     *     tags: [Neo]
     *     parameters:
     *       - name: startDate
     *         in: path
     *         required: true
     *         description: La date de début de la période (format YYYY-MM-DD).
     *         schema:
     *           type: string
     *           format: date
     *       - name: endDate
     *         in: path
     *         required: true
     *         description: La date de fin de la période (format YYYY-MM-DD).
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       '200':
     *         description: APOD récupéré avec succès.
     *         content:
     *           
    */

    // Fonction asynchrone pour récupérer les objets géocroiseurs (Near-Earth Objects, NEO) de l'API de la NASA sur une période donnée.
    public async getNEO(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Extrait les dates de début et de fin des paramètres de la requête pour définir la période de recherche.
        const startDate: string = req.params.startDate;
        const endDate: string = req.params.endDate;

        // Vérifie la validité des dates de début et de fin.
        DataCheck.checkDate(startDate, next);
        DataCheck.checkDate(endDate, next);

        // Vérifie que la période entre la date de début et de fin ne dépasse pas 7 jours.
        if (new Date(endDate).getTime() - new Date(startDate).getTime() > 7 * 24 * 60 * 60 * 1000) {
            // Si la période dépasse 7 jours, interrompt l'exécution et retourne une erreur personnalisée.
            next(new CustomError(errorsCodes.DATE_LIMIT_ERROR_MESSAGE, errorsCodes.DATE_LIMIT_ERROR_CODE, errorsCodes.DATE_LIMIT_ERROR_NAME));
        }

        try {
            // Effectue une requête GET à l'API de la NASA pour récupérer les NEO dans l'intervalle spécifié.
            const response: AxiosResponse = await axios.get(url.NEO + `&start_date=${startDate}&end_date=${endDate}`);
            // Extrait les NEO correspondant à la date de début de la période spécifiée.
            const neos = response.data.near_earth_objects[startDate];
            // Simplifie les données des NEO pour ne retourner que les informations pertinentes.
            const simplifiedNeos: SimplifiedNeoData[] = neos.map((neo: any) => ({
                id: neo.id,
                name: neo.name,
                nasa_jpl_url: neo.nasa_jpl_url,
                minDiameterKm: neo.estimated_diameter.kilometers.estimated_diameter_min,
                maxDiameterKm: neo.estimated_diameter.kilometers.estimated_diameter_max,
                approachDate: neo.close_approach_data[0].close_approach_date_full,
                approachDistanceKm: neo.close_approach_data[0].miss_distance.kilometers,
                velocityKmPerHour: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
                isHazardous: neo.is_potentially_hazardous_asteroid
            }));

            // Envoie les données NEO simplifiées au client avec un statut HTTP 200 (OK).
            res.status(200).json(simplifiedNeos);
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }


    /**
     * @swagger
     *  /neo:
     *   get:
     *     summary: Récupère les NEO d'aujourd'hui.
     *     description: Récupère les NEO d'aujourd'hui.
     *     tags: [Neo]
     *     responses:
     *       '200':
     *         description: NEO récupéré avec succès.
     *         content:
     *           
    */

    // Fonction asynchrone pour récupérer les objets géocroiseurs (NEO) de l'API de la NASA pour la journée actuelle.
    public async getNEOToday(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Définit la date de début et de fin à la date actuelle pour cibler les NEO d'aujourd'hui.
        const startDate: string = new Date().toISOString().split('T')[0];
        const endDate: string = new Date().toISOString().split('T')[0];

        try {
            // Effectue une requête GET à l'API de la NASA avec la date actuelle pour obtenir les NEO du jour.
            const response: AxiosResponse = await axios.get(url.NEO + `&start_date=${startDate}&end_date=${endDate}`);
            // Extrait les NEO de la réponse, basés sur la date de début.
            const neos = response.data.near_earth_objects[startDate];
            // Simplifie les données reçues pour ne conserver que les informations essentielles de chaque NEO.
            const simplifiedNeos: SimplifiedNeoData[] = neos.map((neo: any) => ({
                id: neo.id,
                name: neo.name,
                nasa_jpl_url: neo.nasa_jpl_url,
                minDiameterKm: neo.estimated_diameter.kilometers.estimated_diameter_min,
                maxDiameterKm: neo.estimated_diameter.kilometers.estimated_diameter_max,
                approachDate: neo.close_approach_data[0].close_approach_date_full,
                approachDistanceKm: neo.close_approach_data[0].miss_distance.kilometers,
                velocityKmPerHour: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
                isHazardous: neo.is_potentially_hazardous_asteroid
            }));

            // Renvoie les données NEO simplifiées au client avec un statut HTTP 200 (OK).
            res.status(200).json(simplifiedNeos);
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }

}