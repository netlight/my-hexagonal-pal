import winston from "winston";
import environment from "../config/environment";

const logger = winston.createLogger({
  level: environment.LOG_LEVEL,
  format: winston.format.json(),
  defaultMeta: { service: "my-finance-pal" },
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple(),
    ),
  }),
);

/*
For production we are still missing a log aggregation stack as well
as some monitoring solution! These two things are imperative when it
comes to creating a production ready state-of-the-art application!
Please have a look at solutions like:
Datadog, Elastic APM, Grafana, Prometheus, InfluxDB and many more.
All cloud providers also offer native solutions for the above, so also
check the pricing and features of these as they are often easily
integrable into cloud native applications.
*/

export default logger;
