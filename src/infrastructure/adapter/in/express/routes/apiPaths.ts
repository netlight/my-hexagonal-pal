import { type operations, type paths } from "../../../../../../generated/api";

// Typesafe constant holding all REST endpoint paths based on the OpenAPI specification
const apiPaths: Record<keyof operations, keyof paths> = {
  createBudget: "/budgets",
  getBudgets: "/budgets",
  trackExpense: "/budgets/{budgetId}/expenses",
  getAllIncomes: "/incomes",
  createIncome: "/incomes",
  addIncomeSource: "/incomes/{incomeId}/sources",
};

export default apiPaths;
