import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export type FindBudgetUseCase = (
  budgetId: BudgetId,
) => Promise<Budget | undefined>;

const findBudget: (ports: {
  findBy: BudgetPersistencePort["findBy"];
}) => FindBudgetUseCase = (ports) => async (budgetId) =>
  await ports.findBy(budgetId);

export default findBudget;
