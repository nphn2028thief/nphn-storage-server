import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError, { HttpError } from "http-errors";

import envConfig from "./configs/env";
import routes from "./routes";

config();

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: "https://nphn-storage.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb", type: "application/json" }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api", routes());

app.use((_, res, next) => {
  res.status(404);
  next(createHttpError[404]("This route does not exist."));
});

app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.json({
    status: err.status,
    message: err.message,
  });
  return;
});

export default app;
