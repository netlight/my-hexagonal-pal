import { type Income, type IncomeId } from "../../domain/model/income/income";
import type IncomePersistencePort from "../port/incomePersistencePort";
import IncomeNotFoundError from "../../domain/error/income/incomeNotFoundError";

export interface IncomeApplicationService {
  getById: (id: IncomeId) => Promise<Income>;
}

export const getIncomeById: (ports: {
  getIncomeBy: IncomePersistencePort["getById"];
}) => IncomeApplicationService["getById"] = (ports) => async (id) => {
  const income = await ports.getIncomeBy(id);
  if (income === undefined) {
    throw new IncomeNotFoundError(id);
  }

  return income;
};
