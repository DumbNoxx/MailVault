import express, { Request, Response } from 'express';
const routerAPI: express.Router = express.Router();


routerAPI.get('/', (req: Request, res: Response ) => {
    res.send("Greetings from the endpoint /api");
});


export default routerAPI;