/**
 * Defines the API routes for the application.
 * Sets up an Express router to handle requests to the `/api` endpoint.
 */

import express, { Request, Response } from "express";

const routerAPI: express.Router = express.Router();

/**
 * Handles GET requests to the root `/api` endpoint.
 * Responds with a greeting message.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @returns {void}
 */
routerAPI.get("/", (req: Request, res: Response) => {
  res.send("Greetings from the endpoint /api");
});

export default routerAPI;
