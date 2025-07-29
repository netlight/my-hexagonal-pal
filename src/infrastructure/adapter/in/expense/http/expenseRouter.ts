import { type Request, type Response, Router } from "express";
import { ExpenseDtoConverter, NewExpenseDtoConverter } from "./dto/converters";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import type { NewExpenseDto } from "./dto/expense";
import BudgetNotFoundError from "../../../../../core/domain/error/budget/budgetNotFoundError";
import { BudgetModel } from "../../../out/budget/persistence/mongo/models";
import { BudgetEntityConverter } from "../../../out/budget/persistence/mongo/entity/converters";
import { BudgetId } from "../../../../../core/domain/model/expense/budget";
import ExpenseDateOutOfBoundsError from "../../../../../core/domain/error/expense/expenseDateOutOfBoundsError";
import BudgetLimitReachedError from "../../../../../core/domain/error/budget/budgetLimitReachedError";

export const trackExpense =
  () =>
  async (req: Request, res: Response): Promise<void> => {
    const newExpenseDto: NewExpenseDto = req.body;
    const budgetId: string = req.params.budgetId;
    const expense = NewExpenseDtoConverter.toDomain(newExpenseDto);
    const entity = await BudgetModel.findOne({ id: budgetId });
    if (entity === null) {
      throw new BudgetNotFoundError(new BudgetId(budgetId));
    }
    const budget = BudgetEntityConverter.toDomain(entity);
    if (budget.startDate !== undefined && budget.startDate > expense.date) {
      throw new ExpenseDateOutOfBoundsError(expense, budget);
    }
    if (budget.endDate !== undefined && budget.endDate < expense.date) {
      throw new ExpenseDateOutOfBoundsError(expense, budget);
    }
    const totalSpent = budget.spent + expense.amount;
    if (totalSpent >= budget.limit.amount) {
      throw new BudgetLimitReachedError(budget.limit, expense);
    }
    budget.expenses.push(expense);
    const updatedEntity = BudgetEntityConverter.toEntity(budget);
    const upserted = await BudgetModel.findOneAndUpdate(
      { id: updatedEntity.id },
      updatedEntity,
      {
        upsert: true,
        returnDocument: "after",
      },
    );
    const updatedBudget = BudgetEntityConverter.toDomain(upserted);
    res
      .status(StatusCodes.CREATED)
      .json(ExpenseDtoConverter.toDto(updatedBudget.getExpenseBy(expense.id)!));
  };

const ExpenseRouter = (): Router => {
  const router = Router();
  router.post(
    toExpressPath(apiPaths.trackExpense),
    asyncHandler(trackExpense()),
  );

  return router;
};

export default ExpenseRouter;
