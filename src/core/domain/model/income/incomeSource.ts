import { UniqueId } from "../uniqueId";
import { NonPositiveIncomeSourceError } from "../../error/income/nonPositiveIncomeSourceError";

export class IncomeSourceId extends UniqueId {}

export class IncomeSource {
  constructor(
    public readonly id: IncomeSourceId,
    public readonly name: string,
    public readonly amount: number,
  ) {
    if (amount <= 0) {
      throw new NonPositiveIncomeSourceError(amount);
    }
  }
}
