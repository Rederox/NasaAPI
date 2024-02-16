import { NextFunction, Request, Response } from "express";
import axios, {AxiosResponse} from "axios";
import { url } from "../constants/url";
import { Apod } from "../interfaces/Apod";
import { ApiError } from "../errors/ApiError";
import { NotIntegerError } from "../errors/NotIntegerError";
import { errorsCodes } from "../constants/errorsCodes";

export class ApodController {
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
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }

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
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }

    public async getApodByCount(req: Request, res: Response, next: NextFunction) {
        const count = req.params.count;
        try {
            if (isNaN(Number(count))) {
                next(new NotIntegerError(errorsCodes.NOT_INTEGER_ERROR_MESSAGE));
            }else{
                const response: AxiosResponse<Apod[]> = await axios.get(`${url.APOD}&count=${count}`);
                const apodData : Apod[] = response.data;
                res.status(200).send(apodData);
            }            
        } catch (error) {
            next(new ApiError(errorsCodes.API_ERROR_MESSAGE));
        }
    }
}


    
