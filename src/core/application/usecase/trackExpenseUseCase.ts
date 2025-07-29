import type { Expense } from "../../domain/model/expense/expense";
import type { BudgetId } from "../../domain/model/expense/budget";
import type { BudgetApplicationService } from "../service/budgetApplicationService";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export class TrackExpenseUseCase {
  constructor(
    private readonly budgetPersistencePort: BudgetPersistencePort,
    private readonly budgetAppService: BudgetApplicationService,
  ) {}

  track = async (budgetId: BudgetId, expense: Expense): Promise<Expense> => {
    const budget = await this.budgetAppService.getBudgetById(budgetId);
    budget.register(expense);
    const updatedBudget = await this.budgetPersistencePort.persist(budget);

    return updatedBudget.getExpenseBy(expense.id)!;
  };
}
