import type { Expense } from "../../domain/model/expense/expense";
import type { BudgetId } from "../../domain/model/expense/budget";
import type { BudgetApplicationService } from "../service/budgetApplicationService";
import type BudgetPersistencePort from "../port/budgetPersistencePort";

export type TrackExpenseUseCase = (
  budgetId: BudgetId,
  expense: Expense,
) => Promise<Expense>;

const trackExpense: (
  ports: {
    persist: BudgetPersistencePort["persist"];
  },
  appServices: { getBudgetBy: BudgetApplicationService["findBy"] },
) => TrackExpenseUseCase =
  (ports, appServices) => async (budgetId, expense) => {
    const budget = await appServices.getBudgetBy(budgetId);
    budget.register(expense);
    const updatedBudget = await ports.persist(budget);

    return updatedBudget.getExpenseBy(expense.id)!;
  };

export default trackExpense;
