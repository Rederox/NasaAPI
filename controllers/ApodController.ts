import { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";
import { Apod } from "../interfaces/Apod";

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
     *          description: La météo actuelle
     *          content:
     */

    public async getApodToday(req: Request, res: Response, next: NextFunction) {
        try {
            const response: AxiosResponse = await axios.get(url.APOD);
            
            const apodData : Apod = {
                copyright: response.data.copyright,
                title: response.data.title,
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                media_type: response.data.media_type,
                service_version: response.data.service_version,
                url: response.data.url,
            }
            res.status(200).send(apodData);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération de l'apod");
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

    public async getApod(req: Request, res: Response, next: NextFunction) {
        const date = req.params.date;
        try {
            const response: AxiosResponse = await axios.get(`${url.APOD}&date=${date}`);
            
            
            const apodData : Apod = {
                copyright: response.data.copyright,
                title: response.data.title,
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                media_type: response.data.media_type,
                service_version: response.data.service_version,
                url: response.data.url,
            }
            res.status(200).send(apodData);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération de l'apod");
        }
    }

    

    /**
     * @swagger
     *  /apod/count/{count}:
     *   get:
     *     summary: Récupération de plusieurs APOD.
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

    public async getApodByCount(req: Request, res: Response, next: NextFunction) {
        const count = req.params.count;
        try {
            const response: AxiosResponse<Apod[]> = await axios.get(`${url.APOD}&count=${count}`);
            const apodData : Apod[] = response.data;
            res.status(200).send(apodData);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération de l'apod");
        }
    }
}


    
