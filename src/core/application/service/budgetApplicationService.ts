import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import type BudgetPersistencePort from "../port/budgetPersistencePort";
import BudgetNotFoundError from "../../domain/error/budget/budgetNotFoundError";

export class BudgetApplicationService {
  constructor(private readonly budgetPersistencePort: BudgetPersistencePort) {}

  getBudgetById = async (id: BudgetId): Promise<Budget> => {
    const budget = await this.budgetPersistencePort.findBy(id);
    if (budget === undefined) {
      throw new BudgetNotFoundError(id);
    }

    return budget;
  };
}
