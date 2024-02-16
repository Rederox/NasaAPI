import e, { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";
import { ImagesSearch } from "../interfaces/ImagesSearch";

/**
 * @swagger
 * tags:
 *  name: Images
 *  description: Recherche d'images
 */

export class ImagesSearchController {
    /**
     * @swagger
     *  /images/{search}:
     *   get:
     *     summary: Récupération des images pour une recherche spécifique.
     *     description: Récupération des images pour une recherche spécifique.
     *     tags: [Images]
     *     parameters:
     *       - name: search
     *         in: path
     *         required: true
     *         description: La recherche à effectuer.
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Les images correspondant à la recherche.
     *         content:
     *           
    */

    public async getImages(req: Request, res: Response, next: NextFunction) {
        const search = req.params.search;
        try {
            const response = await axios.get<ImagesSearch>(`${url.IMAGES}${search}`);
            const imagesSearch: ImagesSearch = response.data;
            res.status(200).send(imagesSearch.collection.items);
            
        } catch (error) {
            console.error(error);
            res.status(500).send("error");
        }
    }
}