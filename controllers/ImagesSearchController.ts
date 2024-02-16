import e, { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";
import { ImagesSearch } from "../interfaces/ImagesSearch";
import { ApiError } from "../errors/ApiError";
import { errorsCodes } from "../constants/errorsCodes";

export class ImagesSearchController {
    public async getImages(req: Request, res: Response, next: NextFunction) {
        const search = req.params.search;
        try {
            const response = await axios.get<ImagesSearch>(`${url.IMAGES}${search}`);
            const imagesSearch: ImagesSearch = response.data;
            res.status(200).send(imagesSearch.collection.items);
            
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }
}