import { UniqueId } from "../uniqueId";
import { AppError } from "../../../../infrastructure/adapter/in/express/middleware/errorHandler";

export class ExpenseId extends UniqueId {}

export class Expense {
  constructor(
    public readonly id: ExpenseId,
    public description: string,
    public amount: number,
    public date: Date,
  ) {}

  offset(description: string, date: Date): Expense {
    if (this.amount <= 0) {
      throw new AppError(
        "NegativeExpenseOffset",
        "Cannot offset expense with negative base amount!",
      );
    }
    return new Expense(new ExpenseId(), description, this.amount * -1, date);
  }
}
