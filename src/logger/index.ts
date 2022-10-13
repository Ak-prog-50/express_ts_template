//Note: Use logger with optional chaining. ex: logger?.info("message")

import winston, { format } from "winston";
import { NODE_ENVS } from "../config";
import devLogger, { myFormat } from "./devLogger";
import prodLogger from "./prodLogger";
const { combine, timestamp, label } = format;

let logger: winston.Logger | null = null;

if (process.env.NODE_ENV === NODE_ENVS.dev) {
  logger = devLogger();
} else if (
  process.env.NODE_ENV === NODE_ENVS.prod ||
  process.env.NODE_ENV === NODE_ENVS.dev_remote
) {
  logger = prodLogger();
  if (process.env.NODE_ENV === NODE_ENVS.dev_remote) {
    logger.add(
      new winston.transports.Console({
        format: combine(
          format.colorize(),
          label({ label: "dev_local_logger" }),
          timestamp({ format: "HH:mm:ss" }),
          myFormat,
        ),
      }),
    );
  }
}

export default logger;
