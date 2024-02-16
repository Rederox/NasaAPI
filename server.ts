import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';
import { ApodController } from './controllers/ApodController';
import { ImagesSearchController } from './controllers/ImagesSearchController';
import { NEOController } from './controllers/NEOController';
import { errorHandler } from './middlewares/errorHandler';
import { logRequest, logResponse } from './middlewares/logHandler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swaggerOptions';


// Initialisation des contrôleurs pour les différentes parties de l'API.
const apodController = new ApodController();
const imagesSearchController = new ImagesSearchController();
const neoController = new NEOController();

// Création de l'application Express
const app = express();


// Middleware pour logger les requêtes entrantes et les réponses sortantes
app.use(logRequest);
app.use(logResponse);


// Endpoint racine qui fournit des informations sur les différents endpoints de l'API.
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    const response = {
        message: 'Bienvenue sur l\'API de la Nasa',
        endpoints: {
            apod: {
                today : {
                    url: '/apod',
                    description : 'Récupère l\'APOD (Astronomy Picture of the Day) du jour'
                },
                byDate: {
                    url : '/apod/2024-01-16',
                    description: 'Récupère l\'APOD (Astronomy Picture of the Day) pour une date spécifique'
                },
                byCount: {
                    url: '/apod/count/3',
                    description: 'recupère les APOD (Astronomy Picture of the Day) aléatoire pour un nombre spécifique'
                },
            },
            images: {
                url :'/images/asteroide',
                description: 'Récupère les images correspondant à la recherche'
            },
            neo: {
                today: {
                    url: '/neo', 
                    description: 'Récupère les NEO (Near Earth Object) du jour'
                },               
                byDate: {
                    url: '/neo/2024-01-16/2024-01-17',
                    description: 'Récupère les NEO (Near Earth Object) pour une période spécifique'

                }
            },
            swagger: '/swagger-docs'
        }
    }
    res.send(response);
});

// Définition des endpoints pour l'API, en utilisant les contrôleurs appropriés.
// Endpoint pour récupérer l'APOD du jour.
app.get('/apod', (req: Request, res: Response, next: NextFunction) => {
    apodController.getApodToday(req, res, next);
});

// Endpoint pour récupérer l'APOD pour une date spécifique.
app.get('/apod/:date', (req: Request, res: Response, next: NextFunction) => {
    apodController.getApod(req, res, next);
});

// Endpoint pour récupérer les APOD pour un nombre spécifique.
app.get('/apod/count/:count', (req: Request, res: Response, next: NextFunction) => {
    apodController.getApodByCount(req, res, next);
});

// Endpoint pour récupérer les images correspondant à une recherche spécifique.
app.get('/images/:search', (req: Request, res: Response, next: NextFunction) => {
    imagesSearchController.getImages(req, res, next);
});

// Endpoint pour récupérer les NEO pour une période spécifique.
app.get('/neo/:startDate/:endDate', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEO(req, res, next);
});

// Endpoint pour récupérer les NEO du jour.
app.get('/neo', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEOToday(req, res, next);

});

// Configuration et mise en place de Swagger UI pour la documentation de l'API.
const specs = swaggerJSDoc(swaggerOptions);
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware global pour la gestion des erreurs.
app.use(errorHandler);

// Démarrage du serveur sur le port configuré.
app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});

