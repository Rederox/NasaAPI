import { errorsCodes } from './errorsCodes';

export const logMessage = {
    API_ERROR: `Type d'erreur: ${errorsCodes.API_ERROR_NAME}, Code: ${errorsCodes.API_ERROR_CODE}`,
    DATABASE_ERROR: `Type d'erreur: ${errorsCodes.DATABASE_ERROR_NAME}, Code: ${errorsCodes.DATABASE_ERROR_CODE}`,
    CUSTOM_ERROR: `Type d'erreur: ${errorsCodes.CUSTOM_ERROR_NAME}, Code: ${errorsCodes.CUSTOM_ERROR_CODE}`
}