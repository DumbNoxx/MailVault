import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const routerSendEmail: express.Router = express.Router();

// Generates the limit of users of the API that the user can have.

import rateLimit from "express-rate-limit";
const emailRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2, // IP request per day
  message: "Yo have reached the limit of requests. Try later.",
});

// Use resend's own API in https://resend.com
import { Resend } from "resend";
const resend: Resend = new Resend(process.env.RESEND_API_KEY);

import mEmail from "../model/mEmail";

routerSendEmail.post(
  "/",
  emailRateLimit,
  async (req: Request, res: Response) => {
    // General structure for the form
    const {
      name,
      email,
      enterprice,
      message,
      checkbutton,
    }: {
      name: string;
      email: string;
      enterprice?: string;
      message?: string;
      checkbutton?: boolean;
    } = req.body;

    const adminEmail: string | undefined = process.env.ADMINEMAIL;

    // Function to saves the email
    const main = async () => {
      try {
        await mEmail.saveEmail(email);
      } catch (err) {
        console.log(`There was an error saving the email: ${err}`);
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
        subject: "A customer wants to contact you.",
        text: `Hello. I'm ${name} and i would like to know more about your services.
This is my email: ${email}.
Enterpirce: ${
          enterprice ? `I work in the company:' ${enterprice}` : "Not specified"
        }
message: ${message}
         
I hope to hear from you soon!`,
      };
      // console.log("Sending email with the following parameters: ", params); //Debugging
      // console.log("API Key:", process.env.RESEND_API_KEY); //Debugging
      const response = await resend.emails.send(params);
      if (checkbutton) {
        main();
      }
      res.send("Email sent");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error the sending the email.");
    }
  }
);

export default routerSendEmail;
