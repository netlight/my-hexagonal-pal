import { type Income, type IncomeId } from "../../domain/model/income/income";
import { AppError } from "../../../infrastructure/adapter/in/express/middleware/errorHandler";
import type IncomePersistencePort from "../port/incomePersistencePort";

export interface IncomeApplicationService {
  getById: (id: IncomeId) => Promise<Income>;
}

export const getIncomeById: (ports: {
  getIncomeBy: IncomePersistencePort["getById"];
}) => IncomeApplicationService["getById"] = (ports) => async (id) => {
  const income = await ports.getIncomeBy(id);
  if (income === undefined) {
    throw new AppError(
      "IncomeNotFound",
      `Income with id ${id.value} does not exist`,
    );
  }

  return income;
};
