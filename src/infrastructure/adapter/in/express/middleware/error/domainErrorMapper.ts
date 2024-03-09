import { AppError } from "./errorHandler";
import BudgetNotFoundError from "../../../../../../core/domain/error/budget/budgetNotFoundError";
import ExpenseNotFoundError from "../../../../../../core/domain/error/expense/expenseNotFoundError";
import IncomeNotFoundError from "../../../../../../core/domain/error/income/incomeNotFoundError";
import BudgetLimitReachedError from "../../../../../../core/domain/error/budget/budgetLimitReachedError";
import BudgetOverspendingError from "../../../../../../core/domain/error/budget/budgetOverspendingError";
import ExpenseDateOutOfBoundsError from "../../../../../../core/domain/error/expense/expenseDateOutOfBoundsError";
import { NonPositiveIncomeSourceError } from "../../../../../../core/domain/error/income/nonPositiveIncomeSourceError";
import NegativeLimitError from "../../../../../../core/domain/error/negativeLimitError";
import InvalidIdError from "../../../../../../core/domain/error/invalidIdError";

const httpStatusMappings = [
  { error: BudgetNotFoundError, status: 404 },
  { error: ExpenseNotFoundError, status: 404 },
  { error: IncomeNotFoundError, status: 404 },
  { error: BudgetLimitReachedError, status: 409 },
  { error: BudgetOverspendingError, status: 409 },
  { error: ExpenseDateOutOfBoundsError, status: 409 },
  { error: NonPositiveIncomeSourceError, status: 400 },
  { error: NegativeLimitError, status: 400 },
  { error: InvalidIdError, status: 400 },
];

const mapDomainErrors = (potentialDomainError: Error): Error => {
  const statusMapping = httpStatusMappings.find(
    (mapping) => potentialDomainError instanceof mapping.error,
  );
  if (statusMapping !== undefined) {
    return new AppError(
      potentialDomainError.name,
      potentialDomainError.message,
      statusMapping?.status,
      true,
      potentialDomainError,
    );
  }

  return potentialDomainError;
};

export default mapDomainErrors;
