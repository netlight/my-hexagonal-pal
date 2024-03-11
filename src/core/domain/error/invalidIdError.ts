import { type UniqueIdValidationError } from "../model/uniqueId";

class InvalidIdError extends Error {
  constructor(
    public readonly id: string,
    problems: [UniqueIdValidationError],
  ) {
    super(`ID is not valid: ${JSON.stringify(problems)}`);
  }
}

export default InvalidIdError;
