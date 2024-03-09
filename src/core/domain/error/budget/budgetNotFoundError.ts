import { BudgetId } from "../../model/expense/budget";

class BudgetNotFoundError extends Error {
  constructor(public readonly budgetId: BudgetId) {
    super(`Budget with id ${budgetId.value} not found`);
  }
}

export default BudgetNotFoundError;
