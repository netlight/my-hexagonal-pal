import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import BudgetNotFoundError from "../../domain/error/budget/budgetNotFoundError";

export type FindBudgetUseCase = (
  budgetId: BudgetId,
) => Promise<Budget | undefined>;

const findBudget: (ports: {
  findBy: BudgetPersistencePort["findBy"];
}) => FindBudgetUseCase = (ports) => async (budgetId) => {
  const budget = await ports.findBy(budgetId);
  if (budget === undefined) {
    throw new BudgetNotFoundError(budgetId);
  }

  return budget;
};

export default findBudget;
