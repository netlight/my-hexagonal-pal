import { type Request, type Response, Router } from "express";
import asyncHandler from "express-async-handler";
import type { NewBudgetDto } from "./dto/budget";
import { StatusCodes } from "http-status-codes";
import { BudgetDtoConverter, NewBudgetDtoConverter } from "./dto/converters";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import type { CreateBudgetUseCase } from "../../../../../core/application/usecase/createBudgetUseCase";
import type { FindBudgetUseCase } from "../../../../../core/application/usecase/findBudgetUseCase";
import type { GetAllBudgetsUseCase } from "../../../../../core/application/usecase/getAllBudgetsUseCase";
import { BudgetId } from "../../../../../core/domain/model/expense/budget";

export const createBudget =
  (createBudget: CreateBudgetUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewBudgetDto = req.body;
    const newBudget = NewBudgetDtoConverter.toDomain(dto);
    const createdBudget = await createBudget(newBudget);

    res
      .status(StatusCodes.CREATED)
      .json(BudgetDtoConverter.toDto(createdBudget));
  };

export const findOneBudget =
  (findBudgetUseCase: FindBudgetUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const budget = await findBudgetUseCase(new BudgetId(req.params.budgetId));
    if (budget === undefined) {
      res.status(StatusCodes.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(BudgetDtoConverter.toDto(budget));
    }
  };

export const getAllBudgets =
  (getAllBudgetsUseCase: GetAllBudgetsUseCase) =>
  async (_req: Request, res: Response) => {
    const budgets = await getAllBudgetsUseCase();

    res.status(StatusCodes.OK).json(budgets.map(BudgetDtoConverter.toDto));
  };

const BudgetRouter = (
  createUseCase: CreateBudgetUseCase,
  getAllUseCase: GetAllBudgetsUseCase,
  findOneUseCase: FindBudgetUseCase,
): Router => {
  const router = Router();
  router.post(
    toExpressPath(apiPaths.createBudget),
    asyncHandler(createBudget(createUseCase)),
  );
  router.get(
    toExpressPath(apiPaths.getBudgets),
    asyncHandler(getAllBudgets(getAllUseCase)),
  );
  router.get(
    toExpressPath(apiPaths.findBudgetById),
    asyncHandler(findOneBudget(findOneUseCase)),
  );

  return router;
};

export default BudgetRouter;
