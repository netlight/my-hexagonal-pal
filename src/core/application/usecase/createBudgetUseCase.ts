import type { Budget } from "../../domain/model/expense/budget";
import { validateNoOverspending } from "../../domain/service/balanceDomainService";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";

export type CreateBudgetUseCase = (budget: Budget) => Promise<Budget>;

const createBudget: (ports: {
  getAllBudgets: BudgetPersistencePort["findAll"];
  getAllIncomeStreams: IncomeStreamPersistencePort["findAll"];
  persist: BudgetPersistencePort["persist"];
}) => CreateBudgetUseCase = (ports) => async (budget) => {
  const allIncomeStreams = await ports.getAllIncomeStreams();
  const existingBudgets = await ports.getAllBudgets();
  validateNoOverspending(existingBudgets.concat(budget), allIncomeStreams);

  return await ports.persist(budget);
};

export default createBudget;
