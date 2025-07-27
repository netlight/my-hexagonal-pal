import { type Request, type Response, Router } from "express";
import { ExpenseDtoConverter, NewExpenseDtoConverter } from "./dto/converters";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import type { TrackExpenseUseCase } from "../../../../../core/application/usecase/trackExpenseUseCase";
import { ExpenseId } from "../../../../../core/domain/model/expense/expense";
import type { NewExpenseDto } from "./dto/expense";

export const trackExpense =
  (trackExpense: TrackExpenseUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const newExpenseDto: NewExpenseDto = req.body;
    const budgetId: string = req.params.budgetId;
    let expense = NewExpenseDtoConverter.toDomain(newExpenseDto);
    expense = await trackExpense(new ExpenseId(budgetId), expense);
    res.status(StatusCodes.CREATED).json(ExpenseDtoConverter.toDto(expense));
  };

const ExpenseRouter = (trackUseCase: TrackExpenseUseCase): Router => {
  const router = Router();
  router.post(
    toExpressPath(apiPaths.trackExpense),
    asyncHandler(trackExpense(trackUseCase)),
  );

  return router;
};

export default ExpenseRouter;
