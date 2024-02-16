import { config } from './config';

const api_key = config.API_KEY;


export const url = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${api_key}`,
    NEO: `https://api.nasa.gov/neo/rest/v1/feed?api_key=${api_key}`,
    IMAGES: `https://images-api.nasa.gov/search?q=`,
};