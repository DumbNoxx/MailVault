import express, { Request, Response } from 'express';
const app: express.Application = express();
import cors  from 'cors';
import path from 'path';

import  dotenv  from 'dotenv';
dotenv.config()


// Import type for port
import { Port } from "./types/port.type";

// Middleware
app.set('trust proxy', 1);

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: process.env.FRONT, //Call your frontend
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
app.use(express.json());

app.use(express.urlencoded({extended: true}));

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
import path from 'path';


const PORT: Port = process.env.PORT  || 3000;

// Connection DB  and server Running
app.listen(PORT, () => {
    Connetion.testConnection(); // Test connection to Database
    console.log(`Server is running in http://localhost:${PORT}`);
});