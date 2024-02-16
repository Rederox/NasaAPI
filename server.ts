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

const apodController = new ApodController();
const imagesSearchController = new ImagesSearchController();
const app = express();

const neoController = new NEOController();



app.use(logRequest);
app.use(logResponse);



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

app.get('/apod', (req: Request, res: Response, next: NextFunction) => {
    const response = apodController.getApodToday(req, res, next);
});

app.get('/apod/:date', (req: Request, res: Response, next: NextFunction) => {
    const response = apodController.getApod(req, res, next);
});

app.get('/apod/count/:count', (req: Request, res: Response, next: NextFunction) => {
    const response = apodController.getApodByCount(req, res, next);
});

app.get('/images/:search', (req: Request, res: Response, next: NextFunction) => {
    const response = imagesSearchController.getImages(req, res, next);
});

app.get('/neo/:startDate/:endDate', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEO(req, res, next);
});

app.get('/neo', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEOToday(req, res, next);

});

const specs = swaggerJSDoc(swaggerOptions);
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});

