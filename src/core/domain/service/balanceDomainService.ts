import { type Budget } from "../model/expense/budget";
import { type Income } from "../model/income/income";
import BudgetOverspendingError from "../error/budget/budgetOverspendingError";

export const validateNoOverspending = (budgets: Budget[], income: Income) => {
  const totalSpent = budgets.reduce(
    (prev, curr) => prev + curr.limit.amount,
    0,
  );
  if (totalSpent > income.totalIncome) {
    throw new BudgetOverspendingError(income, totalSpent);
  }
};
