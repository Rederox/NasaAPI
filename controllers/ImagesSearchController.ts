import { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";

export class ImagesSearchController {
    public async getImages(req: Request, res: Response, next: NextFunction) {
        try {
            const search = req.params.search;
            const response: AxiosResponse = await axios.get(url.IMAGES + search);

            res.status(200).send(response.data);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération des images");
        }
    }
}