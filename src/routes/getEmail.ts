import express, { Request, Response } from "express";
const routerGetEmail: express.Router = express.Router();

import GetEmail from "../model/mGetEmail";


routerGetEmail.get('/', (req: Request, res: Response) => {
  GetEmail.getEmail();
  res.redirect("/api");
});


export default routerGetEmail;