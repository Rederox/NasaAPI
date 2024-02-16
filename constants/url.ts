import { config } from './config';

const api_key = config.API_KEY;

// Définition des URLs
export const url = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${api_key}`, // URL pour APOD
    NEO: `https://api.nasa.gov/neo/rest/v1/feed?api_key=${api_key}`, // URL pour NEO
    IMAGES: `https://images-api.nasa.gov/search?q=`, // URL pour les images
};