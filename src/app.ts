import express, { Request, Response } from "express";
const app: express.Application = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// Import type for port
import { Port } from "@types";

// Middleware
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONT, //Call your frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
import {
  routerAPI,
  routerSendEmail,
  routerGetEmail,
  routerSendEmal,
} from "@routes";

app.use("/api", routerAPI);

app.use("/api/send-email", routerSendEmail);

app.use("/api/get-email", routerGetEmail);

app.use("/api/send-publice", routerSendEmal);

// Principal Endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo!!!!");
});

import { mConnection } from "@model";

const PORT: Port = process.env.PORT || 3000;

// Connection DB  and server Running
app.listen(PORT, () => {
  mConnection.testConnection(); // Test connection to Database
  console.log(`Server is running in http://localhost:${PORT}`);
});
