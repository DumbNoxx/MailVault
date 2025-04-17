import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { ENV } from "@env";
import { mEmail } from "@model";
import { BodyReq } from "@interfaces";

const routerSendEmail: express.Router = express.Router();

// Rate limiter middleware to restrict the number of requests per IP.
const emailRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2, // Requests per IP per day
  message: "You have reached the limit of requests. Try later.",
});

const resend: Resend = new Resend(ENV.PRIVATE.RESEND);

/**
 * POST route to handle email sending requests.
 *
 * @route POST /
 * @param {Request} req - Express request object containing the email data in the body.
 * @param {Response} res - Express response object to send the result of the operation.
 * @returns {void}
 * @throws {Error} If an error occurs while sending the email or saving it.
 */
routerSendEmail.post(
  "/",
  emailRateLimit,
  async (req: Request, res: Response) => {
    // General structure for the form
    const { name, email, enterprice, message, checkbutton }: BodyReq = req.body;
    const adminEmail: string = ENV.PRIVATE.ADMIN;

    /**
     * Saves the email to the database.
     * Logs an error if the operation fails.
     *
     * @returns {Promise<void>}
     */
    const main = async (): Promise<void> => {
      try {
        await mEmail.saveEmail(email);
      } catch (err) {
        console.log(`There was an error saving the email: ${err}`);
      }
    };

    // Handle the error of not defining the environment variable ADMINEMAIL
    try {
      if (!adminEmail) {
        throw new Error(
          "ADMINEMAIL is not defined in the environment variables"
        );
      }

      /**
       * Parameters for sending the email to the admin.
       * Includes sender's name, email, optional enterprise, and message.
       *
       * @type {Object}
       * @property {string} from - Sender's address.
       * @property {string} to - Recipient's address.
       * @property {string} subject - Email subject.
       * @property {string} text - Email content.
       */
      const params = {
        from: "CAPTION <onboarding@resend.dev>",
        to: adminEmail,
        subject: "A customer wants to contact you.",
        text: `Hello. I'm ${name} and I would like to know more about your services.
This is my email: ${email}.
Enterprise: ${
          enterprice
            ? `I work in the company: '${enterprice}'`
            : "Not specified"
        }
Message: ${message}
         
I hope to hear from you soon!`,
      };

      // Sends the email using Resend API
      await resend.emails.send(params);

      // Saves the email if the checkbutton is true
      if (checkbutton === true) {
        await main();
      }

      res.send("Email sent");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error sending the email.");
    }
  }
);

export default routerSendEmail;
