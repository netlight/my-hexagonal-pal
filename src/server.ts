import "./preStart"; // always have this at the top of this file in order to execute these scripts first
import * as http from "http";
import app from "./app";
import { listenToErrorEvents } from "./middleware/errorHandler";
import logger from "./logging/logger";
import environment from "./config/environment";
import mongoDb from "./config/mongoDb";

void (async () => {
  await mongoDb.connect();
})();

// callback function logging out server information
const onListening = (server: http.Server) => (): void => {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port ?? ""}`;
  logger.info(`Listening on ${bind}`);
};

// let's first create a server based on our Express application
const server = http.createServer(app);
// then add an error handler for anything uncaught by the app
listenToErrorEvents(server);
server.on("listening", onListening(server));
server.listen(environment.PORT);
