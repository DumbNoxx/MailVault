import express, { Request, Response } from "express";
const routerGetEmail: express.Router = express.Router();

import { mGetEmail } from "@model";

/**
 * Route to handle email retrieval.
 * This route is responsible for invoking the `getEmail` method from the `GetEmail` model
 * and then redirecting the user to the `/api` endpoint.
 */

/**
 * GET / - Retrieves emails and redirects to /api.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
routerGetEmail.get("/", (req: Request, res: Response) => {
  mGetEmail.getEmail(); // Call the method to retrieve emails.
  res.redirect("/api"); // Redirect to the /api endpoint.
});

export default routerGetEmail;
