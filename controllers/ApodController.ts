import { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";
import { Apod } from "../interfaces/Apod";

export class ApodController {
    public async getApod(req: Request, res: Response, next: NextFunction) {
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
}