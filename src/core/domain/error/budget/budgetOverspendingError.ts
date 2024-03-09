import { Income } from "../../model/income/income";

class BudgetOverspendingError extends Error {
  constructor(
    public readonly income: Income,
    public readonly totalSpent: number,
  ) {
    super(
      `Sum of budget expenses (${totalSpent}) is bigger than income (${income.totalIncome})`,
    );
  }
}

export default BudgetOverspendingError;
