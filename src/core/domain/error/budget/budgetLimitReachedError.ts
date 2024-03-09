import { Error } from "mongoose";
import Limit from "../../model/expense/limit";
import { Expense } from "../../model/expense/expense";

class BudgetLimitReachedError extends Error {
  constructor(limit: Limit, expense: Expense) {
    super(
      `Budget limit of ${limit.amount} reached with expense ${JSON.stringify(expense)}`,
    );
  }
}

export default BudgetLimitReachedError;
