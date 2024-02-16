import { config } from './config';

const api_key = "H644arIRSO9oAFnT7g3YjDuMuTfDh19yLhmSVDSc";

export const url = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${api_key}`,
    NEO: `https://api.nasa.gov/neo/rest/v1/feed?api_key=${api_key}`,
    IMAGES: `https://images-api.nasa.gov/search?q=`,
};