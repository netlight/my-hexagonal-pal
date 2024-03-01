import { cleanEnv, port, str, url } from "envalid";
import * as process from "process";

const env = cleanEnv(process.env, {
  PORT: port(),
  LOG_LEVEL: str({ default: "info" }),
  DATABASE_CONNECTION_STRING: url(),
  DATABASE_NAME: str(),
});

export default env;
