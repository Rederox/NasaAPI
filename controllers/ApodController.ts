import { NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { url } from "../constants/url";
import { Apod } from "../interfaces/Apod";
import { ApiError } from "../errors/ApiError";
import { NotIntegerError } from "../errors/NotIntegerError";
import { errorsCodes } from "../constants/errorsCodes";
import { DataCheck } from "../dataCheckers/dataCheck";

/**
 * @swagger
 * tags:
 *  name: Apod
 *  description: Astronomy Picture of the Day 
 */

export class ApodController {

    /**
     * @swagger
     * /apod:
     *  get:
     *      summary: Récupération de l'APOD du jour
     *      description: Récupération de l'APOD ( Astronomy Picture of the Day) du jour
     *      tags: [Apod]
     *      responses:
     *         200:
     *          description: APOD récupéré avec succès.
     *          content:
     */

    // Définit une méthode asynchrone pour récupérer les données de l'Astronomy Picture of the Day (APOD) pour la journée en cours depuis l'API de la NASA.
    public async getApodToday(req: Request, res: Response, next: NextFunction) {
        try {
            // Effectue une requête GET à l'API de la NASA sans spécifier de date pour obtenir l'APOD du jour.
            const response: AxiosResponse = await axios.get(url.APOD);

            // Organise les données de la réponse dans un objet Apod structuré.
            const apodData: Apod = {
                copyright: response.data.copyright,
                title: response.data.title,
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                media_type: response.data.media_type,
                service_version: response.data.service_version,
                url: response.data.url,
            }
            // Envoie les données de l'APOD au client avec un statut HTTP 200 (OK).
            res.status(200).send(apodData);
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }


    /**
     * @swagger
     *  /apod/{date}:
     *   get:
     *     summary: Récupère l'APOD pour une date spécifique.
     *     description: Récupère l'APOD pour une date spécifique.
     *     tags: [Apod]
     *     parameters:
     *       - name: date
     *         in: path
     *         required: true
     *         description: La date de l'APOD à récupérer (format YYYY-MM-DD).
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       '200':
     *         description: APOD récupéré avec succès.
     *         content:
     *           
    */

    // Définit une méthode asynchrone pour récupérer les données Astronomy Picture of the Day (APOD) depuis l'API de la NASA.
    public async getApod(req: Request, res: Response, next: NextFunction) {
        // Extrait la date des paramètres de la requête.
        const date = req.params.date;

        // Vérifie la validité de la date à l'aide de la méthode checkDate.
        DataCheck.checkDate(date, next);

        try {
            // Effectue une requête GET à l'API de la NASA pour récupérer les données APOD de la date spécifiée.
            const response: AxiosResponse = await axios.get(`${url.APOD}&date=${date}`);

            // Extrait les données pertinentes de la réponse et les organise dans un objet Apod.
            const apodData: Apod = {
                copyright: response.data.copyright,
                title: response.data.title,
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                media_type: response.data.media_type,
                service_version: response.data.service_version,
                url: response.data.url,
            }
            // Envoie les données APOD au client avec un statut HTTP 200 (OK).
            res.status(200).send(apodData);
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }




    /**
     * @swagger
     *  /apod/count/{count}:
     *   get:
     *     summary: Récupération de plusieurs APOD aléatoire.
     *     description: Récupération de plusieurs APOD.
     *     tags: [Apod]
     *     parameters:
     *       - name: count
     *         in: path
     *         required: true
     *         description: Le nombre d'APOD à récupérer.
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: APOD récupérés avec succès.
     *         content:
     *           
    */

    // Définit une méthode asynchrone pour récupérer un nombre spécifié de données Astronomy Picture of the Day (APOD) depuis l'API de la NASA.
    public async getApodByCount(req: Request, res: Response, next: NextFunction) {
        // Convertit le paramètre 'count' de la requête en nombre.
        const count: number = Number(req.params.count);

        // Vérifie si 'count' est un entier valide.
        DataCheck.checkInteger(count, next);

        try {
            // Effectue une requête GET à l'API de la NASA pour récupérer un nombre 'count' de données APOD.
            const response: AxiosResponse<Apod[]> = await axios.get(`${url.APOD}&count=${count}`);
            // Stocke les données APOD obtenues dans un tableau.
            const apodData: Apod[] = response.data;
            // Envoie les données APOD au client avec un statut HTTP 200 (OK).
            res.status(200).send(apodData);

        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }

}



