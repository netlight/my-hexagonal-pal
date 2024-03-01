let generator: UniqueIdGenerator;

export const useIdGenerator: (generator: UniqueIdGenerator) => void = (gen) => {
  generator = gen;
};

export interface UniqueIdGenerator {
  generate: () => string;
  validate: (id: string) => void;
}

export abstract class UniqueId {
  public readonly value: string;

  constructor(value: string = generator.generate()) {
    generator.validate(value);
    this.value = value;
  }
}
