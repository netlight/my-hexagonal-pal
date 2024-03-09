/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import dotenv from "dotenv";
import { parse } from "ts-command-line-args";
import path from "path";
import * as process from "process";

// **** Types **** //

interface Args {
  env: string;
}

// **** Setup **** //

// Command line arguments
const args = parse<Args>(
  {
    env: {
      type: String,
      defaultValue: process.env.NODE_ENV ?? "development",
      alias: "e",
    },
  },
  { partial: true },
);

// Set the env file
const dotenvConfig = dotenv.config({
  path: path.join(__dirname, "..", "env", `${args.env}.env`),
});
if (dotenvConfig.error != null) {
  throw dotenvConfig.error;
}
