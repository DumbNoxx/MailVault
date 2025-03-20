import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const routerSendEmail: express.Router = express.Router();

// Generates the limit of users of the API that the user can have.

import rateLimit from "express-rate-limit";
const emailRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: "Haz alcanzado el limite diario de solicitudes. Intenta mas tarde.",
});

// Use resend's own API in https://resend.com 
import { Resend } from "resend";
const resend: Resend = new Resend(process.env.RESEND_API_KEY);

import mEmail from "../model/mEmail";

routerSendEmail.get(
  "/",
  emailRateLimit,
  async (req: Request, res: Response) => {
    // General structure for the form
    const name: string = "Dylan";
    const lastName: string = "Marcano";
    const email: string = "";
    const enterprice: string = "";
    const adminEmail: string | undefined = process.env.ADMINEMAIL;

    // Function to saves the email
    const main = async () => {
      try {
        await mEmail.saveEmail(email);
      } catch (err) {
        console.log(`Hubo un error al guardar el email: ${err}`);
      }
    };

    // Handle the error of not defining the enviroment varible ADMINEMAIL
    try {
      if (!adminEmail) {
        throw new Error(
          "ADMINEMAIL is not defined in the environment variables"
        );
      }

      // Parameters for sending the email to the Admin
      const params = {
        from: "CAPTION <onboarding@resend.dev>",
        to: adminEmail,
        subject: "Nuevo Cliente quiere contactarte",
        text: `Hola, soy ${name} ${lastName} y me gustaría saber más sobre sus servicios. Este es mi email ${email}`,
      };
      console.log("Enviando email con los siguientes parámetros:", params);
      console.log("API Key:", process.env.RESEND_API_KEY);
      const response = await resend.emails.send(params);
      main(); 
      res.send("Email Enviado");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error al enviar el email");
    }
  }
);

export default routerSendEmail;
