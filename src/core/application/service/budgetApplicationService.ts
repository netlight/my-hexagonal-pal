import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import { AppError } from "../../../infrastructure/adapter/in/express/middleware/errorHandler";
import { type ExpenseId } from "../../domain/model/expense/expense";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export interface BudgetApplicationService {
  getById: (id: BudgetId) => Promise<Budget>;
  getByExpenseId: (id: ExpenseId) => Promise<Budget>;
}

export const getBudgetById: (ports: {
  getBudgetBy: BudgetPersistencePort["getById"];
}) => BudgetApplicationService["getById"] = (ports) => async (id) => {
  const budget = await ports.getBudgetBy(id);
  if (budget === undefined) {
    throw new AppError(
      "BudgetNotFound",
      `Budget with id ${id.value} not found`,
    );
  }

  return budget;
};

export const getBudgetByExpenseId: (ports: {
  getBudgetBy: BudgetPersistencePort["getByExpenseId"];
}) => BudgetApplicationService["getByExpenseId"] = (ports) => async (id) => {
  const budget = await ports.getBudgetBy(id);
  if (budget === undefined) {
    throw new AppError(
      "BudgetNotFound",
      `Budget with expense having id ${id.value} not found`,
    );
  }

  return budget;
};
