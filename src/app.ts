import express, { Request, Response } from "express";
import cors from "cors";
import { ENV } from "@env";
import { Port } from "@types";
import {
  routerAPI,
  routerSendEmail,
  routerGetEmail,
  routerSendEmal,
} from "@routes";
import { mConnection } from "@model";

const app: express.Application = express();
const frontend = ENV.PUBLIC.FRONTEND;
const PORT: Port = ENV.PUBLIC.PORT || 3000;

/**
 * Middleware configuration
 * - Enables trust proxy for secure headers.
 * - Configures CORS to allow requests from the frontend.
 * - Parses incoming JSON and URL-encoded payloads.
 */
app.set("trust proxy", 1);

app.use(
  cors({
    origin: frontend, // Allow requests from the frontend URL
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

/**
 * Route configuration
 * - Sets up API routes for various functionalities.
 */
app.use("/api", routerAPI); // Main API router
app.use("/api/send-email", routerSendEmail); // Email sending router
app.use("/api/get-email", routerGetEmail); // Email retrieval router
app.use("/api/send-publice", routerSendEmal); // Public email sending router

/**
 * Principal endpoint
 * - Responds with a simple "Hola mundo!!!!" message.
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo!!!!");
});

/**
 * Starts the server and tests the database connection.
 */
app.listen(PORT, () => {
  mConnection.testConnection(); // Test connection to the database
  console.log(`Server is running in http://localhost:${PORT}`);
});
