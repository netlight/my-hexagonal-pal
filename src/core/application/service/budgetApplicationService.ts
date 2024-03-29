import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import { type ExpenseId } from "../../domain/model/expense/expense";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import BudgetNotFoundError from "../../domain/error/budget/budgetNotFoundError";
import ExpenseNotFoundError from "../../domain/error/expense/expenseNotFoundError";

export interface BudgetApplicationService {
  getById: (id: BudgetId) => Promise<Budget>;
  getByExpenseId: (id: ExpenseId) => Promise<Budget>;
}

export const getBudgetById: (ports: {
  getBudgetBy: BudgetPersistencePort["getById"];
}) => BudgetApplicationService["getById"] = (ports) => async (id) => {
  const budget = await ports.getBudgetBy(id);
  if (budget === undefined) {
    throw new BudgetNotFoundError(id);
  }

  return budget;
};

export const getBudgetByExpenseId: (ports: {
  getBudgetBy: BudgetPersistencePort["getByExpenseId"];
}) => BudgetApplicationService["getByExpenseId"] = (ports) => async (id) => {
  const budget = await ports.getBudgetBy(id);
  if (budget === undefined) {
    throw new ExpenseNotFoundError(id);
  }

  return budget;
};
