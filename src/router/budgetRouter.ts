import { type Request, type Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { BudgetDto, type NewBudgetDto } from "./dto/budget";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "./toExpressPath";
import apiPaths from "./apiPaths";
import { IncomeModel } from "../mongo/income/models";
import { AppError } from "../middleware/errorHandler";
import { v4 as uuidv4 } from "uuid";
import { BudgetModel } from "../mongo/budget/models";

export const createBudget = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newBudgetDto: NewBudgetDto = req.body;
  const incomeId = req.params.incomeId;
  const newBudget: BudgetDto = {
    ...newBudgetDto,
    incomeId,
    expenses: [],
    id: uuidv4(),
  };

  const income = await IncomeModel.findOne({ id: incomeId });
  if (income === undefined || income === null) {
    throw new AppError(
      "IncomeNotFound",
      `Income with id ${incomeId} not found`,
      404,
    );
  }

  const existingBudgets: BudgetDto[] = await BudgetModel.find({ incomeId });
  const totalSpent = existingBudgets
    .concat(newBudget)
    .reduce((prev, curr) => prev + curr.limit, 0);
  const totalIncome = income.sources.reduce(
    (prev, curr) => prev + curr.amount,
    0,
  );
  if (totalSpent > totalIncome) {
    throw new AppError(
      "BudgetOverspending",
      `Sum of budget expenses (${totalSpent}) is bigger than income (${totalIncome})`,
      409,
    );
  }

  await new BudgetModel(newBudget).save();

  res.status(StatusCodes.CREATED).json(newBudget);
};

export const getBudgets = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const incomeId = req.params.incomeId;
  const budgets = await BudgetModel.find({ incomeId });
  res.status(StatusCodes.OK).json(budgets);
};

const BudgetRouter = (): Router => {
  const router = Router();
  router.post(toExpressPath(apiPaths.createBudget), asyncHandler(createBudget));
  router.get(toExpressPath(apiPaths.getBudgets), asyncHandler(getBudgets));

  return router;
};

export default BudgetRouter;
