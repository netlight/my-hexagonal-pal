import { AppError } from "../../../../infrastructure/adapter/in/express/middleware/errorHandler";
import { UniqueId } from "../uniqueId";

export class IncomeSourceId extends UniqueId {}

export class IncomeSource {
  constructor(
    public readonly id: IncomeSourceId,
    public readonly name: string,
    public readonly amount: number,
  ) {
    if (amount <= 0) {
      throw new AppError(
        "NonPositiveIncomeSource",
        `Income source needs to be positive, but was ${amount}`,
      );
    }
  }
}
