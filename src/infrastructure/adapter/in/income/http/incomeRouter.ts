import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import toExpressPath from "../../express/routes/toExpressPath";
import apiPaths from "../../express/routes/apiPaths";
import asyncHandler from "express-async-handler";
import {
  IncomeDto,
  IncomeSourceDto,
  NewIncomeDto,
  type NewIncomeSourceDto,
} from "./dto/income";
import { v4 as uuidv4 } from "uuid";
import { IncomeModel } from "../../../out/income/persistence/mongo/models";
import { AppError } from "../../express/middleware/error/errorHandler";

export const createIncome = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newIncomeDto: NewIncomeDto = req.body;
  const newIncome: IncomeDto = { ...newIncomeDto, id: uuidv4(), sources: [] };
  await new IncomeModel(newIncome).save();

  res.status(StatusCodes.CREATED).json(newIncome);
};

export const addIncomeSource = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newIncomeSourceDto: NewIncomeSourceDto = req.body;
  const incomeId = req.params.incomeId;

  if (newIncomeSourceDto.amount <= 0) {
    throw new AppError(
      "NegativeIncomeSource",
      `Income source needs to be positive, but was ${newIncomeSourceDto.amount}`,
      400,
    );
  }
  const newIncomeSource: IncomeSourceDto = {
    ...newIncomeSourceDto,
    id: uuidv4(),
  };
  const income = await IncomeModel.findOne({ id: incomeId });
  if (income === undefined || income === null) {
    throw new AppError(
      "IncomeNotFound",
      `Income with id ${incomeId} does not exist`,
      404,
    );
  }
  income.sources.push(newIncomeSource);
  await IncomeModel.updateOne({ id: incomeId }, income);

  res.status(StatusCodes.CREATED).json(newIncomeSource);
};

export const getIncomes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const incomes = await IncomeModel.find();
  res.status(StatusCodes.OK).json(incomes);
};

const IncomeRouter = (): Router => {
  const router = Router();
  router.get(toExpressPath(apiPaths.getAllIncomes), asyncHandler(getIncomes));
  router.post(toExpressPath(apiPaths.createIncome), asyncHandler(createIncome));
  router.post(
    toExpressPath(apiPaths.addIncomeSource),
    asyncHandler(addIncomeSource),
  );

  return router;
};

export default IncomeRouter;
