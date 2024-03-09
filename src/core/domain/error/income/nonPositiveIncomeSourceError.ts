import { Error } from "mongoose";

export class NonPositiveIncomeSourceError extends Error {
  constructor(public readonly amount: number) {
    super(`Income source needs to be positive, but was ${amount}`);
  }
}
