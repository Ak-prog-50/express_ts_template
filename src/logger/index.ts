//Note: Use logger with optional chaining. ex: logger?.info("message")

import winston from "winston";
import { NODE_ENVS } from "../config";
import devLogger from "./devLogger";
import prodLogger from "./prodLogger";

let logger: winston.Logger | null = null;

if (process.env.NODE_ENV === NODE_ENVS.dev) {
  logger = devLogger();
} else if (process.env.NODE_ENV === NODE_ENVS.prod) {
  logger = prodLogger();
}

export default logger;
