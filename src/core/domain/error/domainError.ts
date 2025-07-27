import type IncomeNotFoundError from "./income/incomeNotFoundError";
import type { NonPositiveIncomeSourceError } from "./income/nonPositiveIncomeSourceError";
import type ExpenseDateOutOfBoundsError from "./expense/expenseDateOutOfBoundsError";
import type ExpenseNotFoundError from "./expense/expenseNotFoundError";
import type BudgetLimitReachedError from "./budget/budgetLimitReachedError";
import type BudgetNotFoundError from "./budget/budgetNotFoundError";
import type BudgetOverspendingError from "./budget/budgetOverspendingError";
import type NegativeLimitError from "./negativeLimitError";

export type DomainError =
  | IncomeNotFoundError
  | NonPositiveIncomeSourceError
  | ExpenseDateOutOfBoundsError
  | ExpenseNotFoundError
  | BudgetLimitReachedError
  | BudgetNotFoundError
  | BudgetOverspendingError
  | NegativeLimitError;
