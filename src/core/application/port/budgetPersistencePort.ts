import type { Budget, BudgetId } from "../../domain/model/expense/budget";
import type { ExpenseId } from "../../domain/model/expense/expense";

interface BudgetPersistencePort {
  findAll: () => Promise<Budget[]>;
  findBy: (id: BudgetId) => Promise<Budget | undefined>;
  findForExpenseId: (id: ExpenseId) => Promise<Budget | undefined>;
  persist: (budget: Budget) => Promise<Budget>;
}

export default BudgetPersistencePort;
