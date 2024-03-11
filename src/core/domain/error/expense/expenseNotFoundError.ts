import { type ExpenseId } from "../../model/expense/expense";

class ExpenseNotFoundError extends Error {
  constructor(public readonly expenseId: ExpenseId) {
    super(`Budget with expense having id ${expenseId.value} not found`);
  }
}

export default ExpenseNotFoundError;
