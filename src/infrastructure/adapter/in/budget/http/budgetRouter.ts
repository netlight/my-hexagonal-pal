import { type Request, type Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { type NewBudgetDto } from "./dto/budget";
import { StatusCodes } from "http-status-codes";
import { BudgetDtoConverter, NewBudgetDtoConverter } from "./dto/converters";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import type { CreateBudgetUseCase } from "../../../../../core/application/usecase/createBudgetUseCase";
import { type GetBudgetsUseCase } from "../../../../../core/application/usecase/getBudgetsUseCase";
import { IncomeId } from "../../../../../core/domain/model/income/income";

export const createBudget =
  (createBudget: CreateBudgetUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewBudgetDto = req.body;
    const incomeId = req.params.incomeId;
    const newBudget = NewBudgetDtoConverter.toDomain(incomeId, dto);
    const createdBudget = await createBudget(newBudget);

    res
      .status(StatusCodes.CREATED)
      .json(BudgetDtoConverter.toDto(createdBudget));
  };

export const getBudgets =
  (getBudgetsBy: GetBudgetsUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const incomeId = req.params.incomeId;
    const budgets = await getBudgetsBy(new IncomeId(incomeId));
    res.status(StatusCodes.OK).json(budgets.map(BudgetDtoConverter.toDto));
  };

const BudgetRouter = (
  createUseCase: CreateBudgetUseCase,
  getAllUseCase: GetBudgetsUseCase
): Router => {
  const router = Router();
  router.post(
    toExpressPath(apiPaths.createBudget as string),
    asyncHandler(createBudget(createUseCase))
  );
  router.get(
    toExpressPath(apiPaths.getBudgets as string),
    asyncHandler(getBudgets(getAllUseCase))
  );

  return router;
};

export default BudgetRouter;
