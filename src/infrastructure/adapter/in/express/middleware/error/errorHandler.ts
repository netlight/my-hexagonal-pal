import type * as Http from "node:http";
import logger from "../../../../../../logging/logger";
import * as util from "node:util";
import type { NextFunction, Request, Response } from "express";
import mapDomainErrors from "./domainErrorMapper";

// This whole handling logic is copied from https://github.com/practicajs/practica was and modified to fit our application

let httpServerRef: Http.Server | undefined = undefined;

export class AppError extends Error {
  constructor(
    public name: string,
    public message: string,
    public HTTPStatus = 500,
    public isTrusted = true,
    public cause?: unknown,
  ) {
    super(message);
  }
}

// Listen to the global process-level error events
export const listenToErrorEvents = (httpServer: Http.Server): void => {
  httpServerRef = httpServer;

  process.on("uncaughtException", (error) => {
    handleError(error);
  });

  process.on("unhandledRejection", (reason) => {
    handleError(reason);
  });

  process.on("SIGTERM", () => {
    logger.error(
      "App received SIGTERM event, try to gracefully close the server",
    );
    terminateHttpServerAndExit();
  });

  process.on("SIGINT", () => {
    logger.error(
      "App received SIGINT event, try to gracefully close the server",
    );
    terminateHttpServerAndExit();
  });
};

const handleError = (errorToHandle: unknown): void => {
  try {
    const appError: AppError = normalizeError(errorToHandle);
    logger.error(appError.message, appError);
    // A common best practice is to crash when an unknown error (non-trusted) is being thrown
    if (!appError.isTrusted) {
      terminateHttpServerAndExit();
    }
  } catch (handlingError: unknown) {
    // Not using the logger here because it might have failed
    process.stdout.write(
      "The error handler failed, here are the handler failure and then the origin error that it tried to handle",
    );
    process.stdout.write(JSON.stringify(handlingError));
    process.stdout.write(JSON.stringify(errorToHandle));
  }
};

const terminateHttpServerAndExit = (): void => {
  // maybe implement more complex logic here (like using 'http-terminator' library)
  httpServerRef?.close();
  process.exit();
};

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle: unknown): AppError => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(errorToHandle.name, errorToHandle.message);
    ({ stack: appError.stack } = errorToHandle);
    return appError;
  }
  // meaning it could be any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    "general-error",
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
      errorToHandle,
    )}`,
  );
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  err = mapDomainErrors(err);
  if (typeof err === "object") {
    const error = err as AppError;
    if (error.isTrusted === undefined || error.isTrusted === null) {
      error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
    }
  }
  // ✅ Best Practice: Pass all errors to a centralized error handler so they get treated equally
  handleError(err);
  res
    .status((err as AppError).HTTPStatus ?? 500)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion,@typescript-eslint/no-explicit-any  -- fine
    .json({ message: err.message, errors: (err as any).errors })
    .end();
};
