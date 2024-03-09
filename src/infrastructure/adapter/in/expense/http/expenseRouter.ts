import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import { ExpenseDto, type NewExpenseDto } from "./dto/expense";
import { v4 as uuidv4 } from "uuid";
import { BudgetModel } from "../../../out/budget/persistence/mongo/models";
import { AppError } from "../../express/middleware/error/errorHandler";

export const trackExpense = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newExpenseDto: NewExpenseDto = req.body;
  const budgetId: string = req.params.budgetId;
  const newExpense: ExpenseDto = { ...newExpenseDto, id: uuidv4() };

  const budget = await BudgetModel.findOne({ id: budgetId });
  if (budget === undefined || budget === null) {
    throw new AppError(
      "BudgetNotFound",
      `Budget with id ${budgetId} not found`,
      404,
    );
  }
  if (
    (budget.startDate !== undefined &&
      new Date(budget.startDate) > new Date(newExpense.date)) ||
    (budget.endDate !== undefined &&
      new Date(budget.endDate) < new Date(newExpense.date))
  ) {
    throw new AppError(
      "ExpenseOutOfBounds",
      `Expense is not within Budget constraints [expenseDate=${newExpense.date} budgetStart=${budget.startDate} budgetEnd=${budget.endDate}]`,
      409,
    );
  }
  const totalSpent =
    budget.expenses.reduce((prev, curr) => prev + curr.amount, 0) +
    newExpense.amount;
  if (totalSpent >= budget.limit) {
    throw new AppError(
      "BudgetLimitReachedError",
      `Budget limit of ${budget.limit} reached with expense ${JSON.stringify(newExpense)}`,
      409,
    );
  }
  budget.expenses.push(newExpense);
  await BudgetModel.updateOne({ id: budget.id }, budget);

  res.status(StatusCodes.CREATED).json(newExpense);
};

const ExpenseRouter = (): Router => {
  const router = Router();
  router.post(toExpressPath(apiPaths.trackExpense), asyncHandler(trackExpense));

  return router;
};

export default ExpenseRouter;
