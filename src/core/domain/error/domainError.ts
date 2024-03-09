import IncomeNotFoundError from "./income/incomeNotFoundError";
import { NonPositiveIncomeSourceError } from "./income/nonPositiveIncomeSourceError";
import ExpenseDateOutOfBoundsError from "./expense/expenseDateOutOfBoundsError";
import ExpenseNotFoundError from "./expense/expenseNotFoundError";
import BudgetLimitReachedError from "./budget/budgetLimitReachedError";
import BudgetNotFoundError from "./budget/budgetNotFoundError";
import BudgetOverspendingError from "./budget/budgetOverspendingError";
import NegativeLimitError from "./negativeLimitError";

export type DomainError =
  | IncomeNotFoundError
  | NonPositiveIncomeSourceError
  | ExpenseDateOutOfBoundsError
  | ExpenseNotFoundError
  | BudgetLimitReachedError
  | BudgetNotFoundError
  | BudgetOverspendingError
  | NegativeLimitError;
