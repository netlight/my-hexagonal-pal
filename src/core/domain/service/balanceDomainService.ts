import type { Budget } from "../model/expense/budget";
import type { IncomeStream } from "../model/income/incomeStream";
import BudgetOverspendingError from "../error/budget/budgetOverspendingError";

export const validateNoOverspending = (
  budgets: Budget[],
  incomeStreams: IncomeStream[],
): void => {
  const totalSpent = budgets.reduce(
    (prev, curr) => prev + curr.limit.amount,
    0,
  );
  const sumofAllIncomeStreams = incomeStreams.reduce(
    (prev, curr) => prev + curr.totalIncome,
    0,
  );
  if (totalSpent > sumofAllIncomeStreams) {
    throw new BudgetOverspendingError(sumofAllIncomeStreams, totalSpent);
  }
};
