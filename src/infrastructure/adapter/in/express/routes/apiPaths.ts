import type { operations, paths } from "../../../../../../generated/api";

// Typesafe constant holding all REST endpoint paths based on the OpenAPI specification
const apiPaths: Record<keyof operations, keyof paths> = {
  createBudget: "/budgets",
  getBudgets: "/budgets",
  findBudgetById: "/budgets/{budgetId}",
  trackExpense: "/budgets/{budgetId}/expenses",
  createIncomeStream: "/income-streams",
  getAllIncomeStreams: "/income-streams",
  registerEarning: "/income-streams/{incomeStreamId}/earnings",
};

export default apiPaths;
