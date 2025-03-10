import express, { Request, Response } from 'express';
const app: express.Application = express();

// Tipo para el puerto
type Port = number | string;



// Rutas
import routerAPI from './routes/routerAPI';
app.use('/api', routerAPI);

import routerSendEmail from './routes/routerSendEmail';
app.use('/api/send-email', routerSendEmail);

app.get('/', (req: Request, res: Response) => {
    res.send("Hola mundo!!!!");
});


const PORT: Port = process.env.PORT  || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});