import type Limit from "./limit";
import { type Expense, ExpenseId } from "./expense";
import { UniqueId } from "../uniqueId";
import { AppError } from "../../../../infrastructure/adapter/in/express/middleware/errorHandler";
import { IncomeId } from "../income/income";

export class BudgetId extends UniqueId {}

export class Budget {
  constructor(
    public readonly id: BudgetId,
    public readonly incomeId: IncomeId,
    public name: string,
    public limit: Limit,
    public expenses: Expense[],
    public startDate?: Date,
    public endDate?: Date,
  ) {}

  get spent(): number {
    return this.expenses.reduce((prev, curr) => prev + curr.amount, 0);
  }

  register(expense: Expense): void {
    this.validateExpenseWithinBounds(expense);
    this.validateLimitNotReachedWith(expense);

    this.expenses.push(expense);
  }

  getExpenseBy(id: ExpenseId): Expense | undefined {
    return this.expenses.find((expense) => expense.id.value === id.value);
  }

  offset(expenseId: ExpenseId, description: string, date: Date): Expense {
    const expenseToOffset = this.getExpenseBy(expenseId);
    if (expenseToOffset === undefined) {
      throw new AppError(
        "ExpenseNotFound",
        `Expense with id ${expenseId.value} does not exist`,
      );
    }

    return expenseToOffset.offset(description, date);
  }

  private validateExpenseWithinBounds(expense: Expense): void {
    if (this.startDate !== undefined && this.startDate > expense.date) {
      throw new AppError(
        "ExpenseDateOutOfBounds",
        `Expense is before start of Budget ${JSON.stringify(this)}`,
      );
    }
    if (this.endDate !== undefined && this.endDate < expense.date) {
      throw new AppError(
        "ExpenseDateOutOfBounds",
        `Expense is after end of Budget ${JSON.stringify(this)}`,
      );
    }
  }

  private validateLimitNotReachedWith(expense: Expense): void {
    const totalSpent = this.spent + expense.amount;
    if (totalSpent >= this.limit.amount) {
      throw new AppError(
        "BudgetLimitReached",
        `Budget limit of ${this.limit.amount} reached with expense ${JSON.stringify(expense)}`,
      );
    }
  }
}
