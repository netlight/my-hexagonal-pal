import { type Budget } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export type GetBudgetsUseCase = () => Promise<Budget[]>;

const getBudgets: (ports: {
  getAllBudgets: BudgetPersistencePort["getAll"];
}) => GetBudgetsUseCase = (ports) => async () => {
  return await ports.getAllBudgets();
};

export default getBudgets;
