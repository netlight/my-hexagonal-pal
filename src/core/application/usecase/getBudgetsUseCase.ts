import { type Budget } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import { IncomeId } from "../../domain/model/income/income";

export type GetBudgetsUseCase = (incomeId: IncomeId) => Promise<Budget[]>;

const getBudgets: (ports: {
  getAllBudgetsBy: BudgetPersistencePort["getAllByIncomeId"];
}) => GetBudgetsUseCase = (ports) => async (incomeId) => {
  return await ports.getAllBudgetsBy(incomeId);
};

export default getBudgets;
