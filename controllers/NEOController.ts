import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { url } from '../constants/url';
import { SimplifiedNeoData } from '../interfaces/NEO';


export class NEOController {

    public async getNEO(req: Request, res: Response, next: NextFunction): Promise<void> { // TODO: add limit 7 days
        try {
            const startDate: string = req.params.startDate;
            const endDate: string = req.params.endDate;
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
            res.status(500).json({ message: error });
        }
    }

    public async getNEOToday(req: Request, res: Response, next: NextFunction): Promise<void> { // TODO: add limit 7 days
        try {
            const startDate: string = new Date().toISOString().split('T')[0];
            const endDate: string = new Date().toISOString().split('T')[0];
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
            res.status(500).json({ message: error });
        }
    }
}