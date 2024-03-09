import { UniqueId } from "../uniqueId";

export class ExpenseId extends UniqueId {}

export class Expense {
  constructor(
    public readonly id: ExpenseId,
    public description: string,
    public amount: number,
    public date: Date,
  ) {}
}
