import InvalidIdError from "../error/invalidIdError";

let generator: UniqueIdGenerator;

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

  constructor(value: string = generator.generate()) {
    const problems = generator.validate(value);
    if (problems) {
      throw new InvalidIdError(value, problems);
    }
    this.value = value;
  }
}
