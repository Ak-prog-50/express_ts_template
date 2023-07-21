import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GET_DB_URL, GET_FRONTEND_URL, winston_format } from "./config";
import logger from "./logger";
import { IRequest } from "./types/vendor/IRequest";
import { IResponse } from "./types/vendor/IResponse";
const { PORT } = process.env;
const app = express();

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

app.get("/", (req: IRequest, res: IResponse) => {
  return res.status(200).json({ message: "Server is Running" });
});

logger?.info(winston_format("0x00", "Info"));

mongoose
  .connect(GET_DB_URL())
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.error("DB connection error", err));
