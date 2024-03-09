import expressWinston from "express-winston";
import winston from "winston";
import environment from "../config/environment";

const expressLogger = expressWinston.logger({
  level: environment.LOG_LEVEL,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  meta: true,
  expressFormat: true,
});

export default expressLogger;
