import e, { NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { url } from "../constants/url";
import { ImagesSearch } from "../interfaces/ImagesSearch";
import { ApiError } from "../errors/ApiError";
import { errorsCodes } from "../constants/errorsCodes";

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
     *     summary: Récupération des images de la bdd de NASA .
     *     description: Recherche d'images.
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

    // Définit une méthode asynchrone pour rechercher et récupérer des images basées sur un terme de recherche spécifié dans l'API des images.
    public async getImages(req: Request, res: Response, next: NextFunction) {
        // Récupère le terme de recherche des paramètres de la requête.
        const search = req.params.search;
        try {
            // Effectue une requête GET à l'API des images avec le terme de recherche pour récupérer les images correspondantes.
            const response = await axios.get<ImagesSearch>(`${url.IMAGES}${search}`);
            // Stocke la réponse de l'API, qui contient une collection d'images, dans une variable.
            const imagesSearch: ImagesSearch = response.data;
            // Envoie uniquement les éléments de la collection (les images) au client avec un statut HTTP 200 (OK).
            res.status(200).send(imagesSearch.collection.items);

        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }

}