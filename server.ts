import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';
import { NEOController } from './controllers/NEOController';


const app = express();

const neoController = new NEOController();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Vous êtes sur la page d\'accueil de l\'API de la Nasa');
});

app.get('/neo/:startDate/:endDate', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEO(req, res, next);
});

app.get('/neo', (req: Request, res: Response, next: NextFunction) => {
    neoController.getNEOToday(req, res, next);
});

app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});
