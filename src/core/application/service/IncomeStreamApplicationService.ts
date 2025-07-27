import type {
  IncomeStream,
  IncomeStreamId,
} from "../../domain/model/income/incomeStream";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";
import IncomeNotFoundError from "../../domain/error/income/incomeNotFoundError";

export interface IncomeStreamApplicationService {
  findBy: (id: IncomeStreamId) => Promise<IncomeStream>;
}

export const getIncomeStreamById: (ports: {
  findBy: IncomeStreamPersistencePort["findBy"];
}) => IncomeStreamApplicationService["findBy"] = (ports) => async (id) => {
  const income = await ports.findBy(id);
  if (income === undefined) {
    throw new IncomeNotFoundError(id);
  }

  return income;
};
