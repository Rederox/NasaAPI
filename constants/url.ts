import { config } from './config';

export const url = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${config.API_KEY}`,
    NEO: 'https://api.nasa.gov/neo/rest/v1/feed'
};