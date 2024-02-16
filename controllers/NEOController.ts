import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { url } from '../constants/url';
import { SimplifiedNeoData } from '../interfaces/NEO';
import { ApiError } from '../errors/ApiError';
import { errorsCodes } from '../constants/errorsCodes';
import { CustomError } from '../errors/CustomError';

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

    public async getNEO(req: Request, res: Response, next: NextFunction): Promise<void> { // Récupère les NEO pour une période spécifique
        try {
            const startDate: string = req.params.startDate;
            const endDate: string = req.params.endDate;

            if(startDate === '' || endDate === ''){ 
                next(new CustomError(errorsCodes.PARMETERS_MISSING_ERROR_MESSAGE, errorsCodes.PARMETERS_MISSING_ERROR_CODE, errorsCodes.PARMETERS_MISSING_ERROR_NAME));
            }

            if(new Date(endDate).getTime() - new Date(startDate).getTime() > 7 * 24 * 60 * 60 * 1000){
                next(new CustomError(errorsCodes.DATE_LIMIT_ERROR_MESSAGE, errorsCodes.DATE_LIMIT_ERROR_CODE, errorsCodes.DATE_LIMIT_ERROR_NAME));
            }

            const response: AxiosResponse = await axios.get(url.NEO + `&start_date=${startDate}&end_date=${endDate}`);
            const neos = response.data.near_earth_objects[startDate];
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

    public async getNEOToday(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const startDate: string = new Date().toISOString().split('T')[0];
            const endDate: string = new Date().toISOString().split('T')[0];
            
            if(new Date(endDate).getTime() - new Date(startDate).getTime() > 7 * 24 * 60 * 60 * 1000){
                next(new CustomError(errorsCodes.DATE_LIMIT_ERROR_MESSAGE, errorsCodes.DATE_LIMIT_ERROR_CODE, errorsCodes.DATE_LIMIT_ERROR_NAME));
            }

            const response: AxiosResponse = await axios.get(url.NEO + `&start_date=${startDate}&end_date=${endDate}`);
            const neos = response.data.near_earth_objects[startDate];
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

            res.status(200).json(simplifiedNeos);
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }
}