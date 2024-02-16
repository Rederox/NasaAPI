import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';


const app = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Vous êtes sur la page d\'accueil de l\'API de la Nasa');
});

app.listen(config.PORT, () => {
    console.log(`Le serveur est lancée sur l'url : http://localhost:${config.PORT}`);
});
