import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import type { ExpenseId } from "../../domain/model/expense/expense";
import type { IncomeId } from "../../domain/model/income/income";

interface BudgetPersistencePort {
  getById: (id: BudgetId) => Promise<Budget | undefined>;
  getByExpenseId: (id: ExpenseId) => Promise<Budget | undefined>;
  persist: (budget: Budget) => Promise<Budget>;
  getAllByIncomeId: (id: IncomeId) => Promise<Budget[]>;
}

export default BudgetPersistencePort;
