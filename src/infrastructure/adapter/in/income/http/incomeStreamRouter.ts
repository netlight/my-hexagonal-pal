import { type Request, type Response, Router } from "express";
import type { NewBudgetDto } from "../../budget/http/dto/budget";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import type { OpenNewIncomeStreamUseCase } from "../../../../../core/application/usecase/openNewIncomeStreamUseCase";
import {
  EarningsDtoConverter,
  IncomeStreamDtoConverter,
} from "./dto/converter";
import type { RegisterEarningUseCase } from "../../../../../core/application/usecase/registerEarningUseCase";
import type { GetAllIncomeStreamsUseCase } from "../../../../../core/application/usecase/getAllIncomeStreamsUseCase";
import type { NewEarning } from "./dto/income";
import { IncomeStreamId } from "../../../../../core/domain/model/income/incomeStream";

export const createIncomeStream =
  (openNewIncomeStreamUseCase: OpenNewIncomeStreamUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewBudgetDto = req.body;
    const newIncome = IncomeStreamDtoConverter.toDomain(dto);
    const createdIncome = await openNewIncomeStreamUseCase(newIncome);

    res
      .status(StatusCodes.CREATED)
      .json(IncomeStreamDtoConverter.toDto(createdIncome));
  };

export const registerEarning =
  (registerEarningUseCase: RegisterEarningUseCase) =>
  async (req: Request, res: Response): Promise<void> => {
    const dto: NewEarning = req.body;
    const newEarning = EarningsDtoConverter.toDomain(dto);
    const createdEarning = await registerEarningUseCase(
      new IncomeStreamId(req.params.incomeStreamId),
      newEarning,
    );

    res
      .status(StatusCodes.CREATED)
      .json(EarningsDtoConverter.toDto(createdEarning));
  };

export const getAllIncomeStreams =
  (getAllIncomeStreamsUseCase: GetAllIncomeStreamsUseCase) =>
  async (_req: Request, res: Response): Promise<void> => {
    const incomes = await getAllIncomeStreamsUseCase();
    res
      .status(StatusCodes.OK)
      .json(incomes.map(IncomeStreamDtoConverter.toDto));
  };

const IncomeStreamRouter = (
  getAllIncomeStreamsUseCase: GetAllIncomeStreamsUseCase,
  openNewIncomeStreamUseCase: OpenNewIncomeStreamUseCase,
  registerEarningUseCase: RegisterEarningUseCase,
): Router => {
  const router = Router();
  router.get(
    toExpressPath(apiPaths.getAllIncomeStreams),
    asyncHandler(getAllIncomeStreams(getAllIncomeStreamsUseCase)),
  );
  router.post(
    toExpressPath(apiPaths.createIncomeStream),
    asyncHandler(createIncomeStream(openNewIncomeStreamUseCase)),
  );
  router.post(
    toExpressPath(apiPaths.registerEarning),
    asyncHandler(registerEarning(registerEarningUseCase)),
  );

  return router;
};

export default IncomeStreamRouter;
