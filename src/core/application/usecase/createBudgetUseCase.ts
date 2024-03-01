import { type Budget } from "../../domain/model/expense/budget";
import { AppError } from "../../../infrastructure/adapter/in/express/middleware/errorHandler";
import { isOverspending } from "../../domain/service/balanceDomainService";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import { type IncomeApplicationService } from "../service/IncomeApplicationService";

export type CreateBudgetUseCase = (budget: Budget) => Promise<Budget>;

const createBudget: (
  ports: {
    getAllBudgetsBy: BudgetPersistencePort["getAllByIncomeId"];
    persist: BudgetPersistencePort["persist"];
  },
  appServices: { getIncomeBy: IncomeApplicationService["getById"] },
) => CreateBudgetUseCase = (ports, appServices) => async (budget) => {
  const income = await appServices.getIncomeBy(budget.incomeId);
  const existingBudgets = await ports.getAllBudgetsBy(budget.incomeId);
  if (isOverspending(existingBudgets.concat(budget), income)) {
    throw new AppError(
      "BudgetOverspending",
      "Sum of budget limits is bigger than income",
    );
  }

  return await ports.persist(budget);
};

export default createBudget;
