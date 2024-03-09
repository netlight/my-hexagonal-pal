import type Limit from "./limit";
import { type Expense, ExpenseId } from "./expense";
import { UniqueId } from "../uniqueId";
import { IncomeId } from "../income/income";
import ExpenseDateOutOfBoundsError from "../../error/expense/expenseDateOutOfBoundsError";
import BudgetLimitReachedError from "../../error/budget/budgetLimitReachedError";

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

  private validateExpenseWithinBounds(expense: Expense): void {
    if (this.startDate !== undefined && this.startDate > expense.date) {
      throw new ExpenseDateOutOfBoundsError(expense, this);
    }
    if (this.endDate !== undefined && this.endDate < expense.date) {
      throw new ExpenseDateOutOfBoundsError(expense, this);
    }
  }

  private validateLimitNotReachedWith(expense: Expense): void {
    const totalSpent = this.spent + expense.amount;
    if (totalSpent >= this.limit.amount) {
      throw new BudgetLimitReachedError(this.limit, expense);
    }
  }
}
