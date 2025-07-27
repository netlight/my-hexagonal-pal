import { Error } from "mongoose";
import type Limit from "../../model/expense/limit";
import type { Expense } from "../../model/expense/expense";

class BudgetLimitReachedError extends Error {
  constructor(limit: Limit, expense: Expense) {
    super(
      `Budget limit of ${limit.amount} reached with expense ${JSON.stringify(expense)}`,
    );
  }
}

export default BudgetLimitReachedError;
