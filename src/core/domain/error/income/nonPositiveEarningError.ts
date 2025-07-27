import { Error } from "mongoose";

export class NonPositiveEarningError extends Error {
  constructor(public readonly amount: number) {
    super(`Earning needs to be positive, but was ${amount}`);
  }
}
