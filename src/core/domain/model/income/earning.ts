import { UniqueId } from "../uniqueId";
import { NonPositiveEarningError } from "../../error/income/nonPositiveEarningError";

export class EarningId extends UniqueId {}

export class Earning {
  constructor(
    public readonly id: EarningId,
    public readonly name: string,
    public readonly amount: number,
  ) {
    if (amount <= 0) {
      throw new NonPositiveEarningError(amount);
    }
  }
}
