import express, { Request, Response } from 'express';
const app: express.Application = express();

// Import type for port
import { Port } from "./types/port.type";

// Routes
import routerAPI from './routes/routerAPI';
app.use('/api', routerAPI);

import routerSendEmail from './routes/routerSendEmail';
app.use('/api/send-email', routerSendEmail);

import routerGetEmail from './routes/getEmail';
app.use('/api/get-email', routerGetEmail);

import routerSendEmal from './routes/routerSendEmailPublice';
app.use("/api/send-publice", routerSendEmal);


// Principal Endpoint
app.get('/', (req: Request, res: Response) => {
    res.send("Hola mundo!!!!");
});

import Connetion from './model/mConnection';


const PORT: Port = process.env.PORT  || 3000;

// Connection DB  and server Running
app.listen(PORT, () => {
    Connetion.testConnection(); // Test connection to Database
    console.log(`Server is running in http://localhost:${PORT}`);
});