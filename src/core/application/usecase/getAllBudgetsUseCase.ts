import type { Budget } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export type GetAllBudgetsUseCase = () => Promise<Budget[]>;

const getAllBudgets: (ports: {
  findAllBudgets: BudgetPersistencePort["findAll"];
}) => GetAllBudgetsUseCase = (ports) => async () =>
  await ports.findAllBudgets();

export default getAllBudgets;
