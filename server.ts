import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';
import { ApodController } from './controllers/ApodController';
import { ImagesSearchController } from './controllers/ImagesSearchController';
import { NEOController } from './controllers/NEOController';
import { errorHandler } from './middlewares/errorHandler';
import { logRequest, logResponse } from './middlewares/logHandler';

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
                today: '/apod',
                byDate: '/apod/2024-01-16',
                count: '/apod/count/3'
            },
            images: '/images/asteroide',
            neo: {
                today: '/neo',
                byDate: '/neo/2024-01-16/2024-01-17'
            }
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

app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});

