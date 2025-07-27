import { type Request, type Response, Router } from "express";
import type { NewBudgetDto } from "../../budget/http/dto/budget";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import type { CreateIncomeUseCase } from "../../../../../core/application/usecase/createIncomeUseCase";
import { IncomeDtoConverter, IncomeSourceDtoConverter } from "./dto/converter";
import type { AddIncomeSourceUseCase } from "../../../../../core/application/usecase/addIncomeSourceUseCase";
import type { GetIncomesUseCase } from "../../../../../core/application/usecase/getIncomesUseCase";
import type { NewIncomeSourceDto } from "./dto/income";
import { IncomeId } from "../../../../../core/domain/model/income/income";

export const createIncome =
  (createIncome: CreateIncomeUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewBudgetDto = req.body;
    const newIncome = IncomeDtoConverter.toDomain(dto);
    const createdIncome = await createIncome(newIncome);

    res
      .status(StatusCodes.CREATED)
      .json(IncomeDtoConverter.toDto(createdIncome));
  };

export const addIncomeSource =
  (addIncomeSource: AddIncomeSourceUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewIncomeSourceDto = req.body;
    const newIncomeSource = IncomeSourceDtoConverter.toDomain(dto);
    const createdIncomeSource = await addIncomeSource(
      new IncomeId(req.params.incomeId),
      newIncomeSource,
    );

    res
      .status(StatusCodes.CREATED)
      .json(IncomeSourceDtoConverter.toDto(createdIncomeSource));
  };

export const getIncomes =
  (getIncomes: GetIncomesUseCase) =>
  async (_req: Request, res: Response): Promise<void> => {
    const incomes = await getIncomes();
    res.status(StatusCodes.OK).json(incomes.map(IncomeDtoConverter.toDto));
  };

const IncomeRouter = (
  getIncomesUseCase: GetIncomesUseCase,
  createIncomeUseCase: CreateIncomeUseCase,
  addIncomeSourceUseCase: AddIncomeSourceUseCase,
): Router => {
  const router = Router();
  router.get(
    toExpressPath(apiPaths.getAllIncomes),
    asyncHandler(getIncomes(getIncomesUseCase)),
  );
  router.post(
    toExpressPath(apiPaths.createIncome),
    asyncHandler(createIncome(createIncomeUseCase)),
  );
  router.post(
    toExpressPath(apiPaths.addIncomeSource),
    asyncHandler(addIncomeSource(addIncomeSourceUseCase)),
  );

  return router;
};

export default IncomeRouter;
