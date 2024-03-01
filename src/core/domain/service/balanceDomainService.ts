import { type Budget } from "../model/expense/budget";
import { type Income } from "../model/income/income";

export const isOverspending = (budgets: Budget[], income: Income): boolean => {
  const spendingSum = budgets.reduce(
    (prev, curr) => prev + curr.limit.amount,
    0,
  );
  return spendingSum > income.totalIncome;
};
