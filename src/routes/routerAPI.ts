import express, { Request, Response } from 'express';

const routerAPI: express.Router = express.Router();

routerAPI.get('/', (req: Request, res: Response ) => {
    res.send("Saludo desde la ruta /api");
});


export default routerAPI;