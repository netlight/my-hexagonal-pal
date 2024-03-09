import { type operations, type paths } from "../../../../../../generated/api";

// Typesafe constant holding all REST endpoint paths based on the OpenAPI specification
const apiPaths: Record<keyof operations, keyof paths> = {
  createBudget: "/incomes/{incomeId}/budgets",
  getBudgets: "/incomes/{incomeId}/budgets",
  trackExpense: "/incomes/{incomeId}/budgets/{budgetId}/expenses",
  getAllIncomes: "/incomes",
  createIncome: "/incomes",
  addIncomeSource: "/incomes/{incomeId}/sources",
};

export default apiPaths;
