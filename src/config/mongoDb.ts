import mongoose from "mongoose";
import environment from "./environment";
import logger from "../logging/logger";
import * as util from "util";

export const connect = async (): Promise<void> => {
  await mongoose.connect(environment.DATABASE_CONNECTION_STRING, {
    dbName: environment.DATABASE_NAME,
  });
};

if (environment.LOG_LEVEL === "debug") {
  // https://dev.to/sw360cab/mongoose-debug-messages-with-a-custom-logging-library-or-style-1hk4
  mongoose.set("debug", (collectionName, methodName, ...methodArgs) => {
    const msgMapper = (m: any): string => {
      return util
        .inspect(m, false, 10, true)
        .replace(/\n/g, "")
        .replace(/\s{2,}/g, " ");
    };
    logger.debug(
      `\x1B[0;36mMongoose:\x1B[0m: ${collectionName}.${methodName}` +
        `(${methodArgs.map(msgMapper).join(", ")})`,
    );
  });
}

export default { connect };
