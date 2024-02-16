import express, { Response, Request, NextFunction } from 'express';
import { config } from './constants/config';


const app = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.listen(config.PORT, () => {
    console.log(`Le serveur est en route sur le port : ${config.PORT}`);
});
