import express, { Request, Response } from "express";
import SendEmail from "../model/mSendEmail";


const routerSendEmal: express.Router = express.Router();


routerSendEmal.get("/", (req: Request, res: Response) => {
  SendEmail.sendEmail();
  res.redirect('/api');
});


export default routerSendEmal;