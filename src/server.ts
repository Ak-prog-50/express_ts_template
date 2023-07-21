import express, { NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GET_DB_URL, GET_FRONTEND_URL, winston_format } from "./config";
import logger from "./logger";
import { IRequest } from "./types/vendor/IRequest";
import { IResponse } from "./types/vendor/IResponse";
import userRouter from "./routes/userRouter";
import AppError from "./utils/error-handling/AppErrror";
import appErrorHandler from "./utils/error-handling/appErrorHandler";
const { PORT } = process.env;
const app = express();

// Initial setup for server
app.use(
  cors({
    credentials: true,
    origin: [GET_FRONTEND_URL()],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Content-Type",
      "Origin",
    ],
  }),
);
app.use(express.json());

// Map routes
app.get("/", (req: IRequest, res: IResponse) => {
  return res.status(200).json({ message: "Server is Running" });
});

const router = express.Router();
app.use("/user", userRouter(router));

app.all("*", (req: IRequest, res: IResponse, next: NextFunction): void => {
  appErrorHandler(AppError.notFound("Route not found"), req, res, next);
});

mongoose
  .connect(GET_DB_URL())
  .then(() => {
    logger.info("DB connected");
    app.listen(PORT, () => {
      logger.info("Server is running");
    });
  })
  .catch((err) => logger.error("DB connection error", err));
