import InvalidIdError from "../error/invalidIdError";

let generator: UniqueIdGenerator | undefined = undefined;

export const useIdGenerator: (generator: UniqueIdGenerator) => void = (gen) => {
  generator = gen;
};

export interface UniqueIdValidationError {
  description: string;
}

export interface UniqueIdGenerator {
  generate: () => string;
  validate: (id: string) => [UniqueIdValidationError] | undefined;
}

export abstract class UniqueId {
  public readonly value: string;

  constructor(value: string | undefined = undefined) {
    if (generator === undefined) {
      throw Error("ID generator not initialized!");
    }
    value ??= generator.generate();
    const problems = generator.validate(value);
    if (problems !== undefined) {
      throw new InvalidIdError(value, problems);
    }
    this.value = value;
  }
}
