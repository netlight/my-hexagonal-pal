import { Error } from "mongoose";
import type { Budget } from "../../model/expense/budget";
import type { Expense } from "../../model/expense/expense";

class ExpenseDateOutOfBoundsError extends Error {
  constructor(
    public readonly expense: Expense,
    public readonly budget: Budget,
  ) {
    super(
      `Expense is not within Budget constraints [expenseDate=${JSON.stringify(expense.date)} budgetStart=${JSON.stringify(budget.startDate)} budgetEnd=${JSON.stringify(budget.endDate)}]`,
    );
  }
}

export default ExpenseDateOutOfBoundsError;
