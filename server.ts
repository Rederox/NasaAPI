import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';
import { ApodController } from './controllers/ApodController';
import { ImagesSearchController } from './controllers/ImagesSearchController';

const apodController = new ApodController();
const imagesSearchController = new ImagesSearchController();
const app = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Vous êtes sur la page d\'accueil de l\'API de la Nasa');
});

app.get('/apod', (req: Request, res: Response, next: NextFunction) => {
    const response = apodController.getApod(req, res, next);
});

app.get('/images/:search', (req: Request, res: Response, next: NextFunction) => {
    const response = imagesSearchController.getImages(req, res, next);
});

app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});
