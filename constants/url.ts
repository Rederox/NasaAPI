import { config } from './config';

const api_key = 'g07tkPoJbM0bxfR4GM7wExeOOknx2ickpO94hCpe';

export const url = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${api_key}`,
    NEO: `https://api.nasa.gov/neo/rest/v1/feed?api_key=${api_key}`
};