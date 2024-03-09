import { type IncomeId } from "../../domain/model/income/income";
import { type IncomeSource } from "../../domain/model/income/incomeSource";
import type IncomePersistencePort from "../port/incomePersistencePort";
import { type IncomeApplicationService } from "../service/IncomeApplicationService";

export type AddIncomeSourceUseCase = (
  incomeId: IncomeId,
  incomeSource: IncomeSource,
) => Promise<IncomeSource>;

const addIncomeSource: (
  ports: { persist: IncomePersistencePort["persist"] },
  appServices: { getIncomeBy: IncomeApplicationService["getById"] },
) => AddIncomeSourceUseCase =
  (ports, appServices) => async (incomeId, incomeSource) => {
    const income = await appServices.getIncomeBy(incomeId);
    income.add(incomeSource);
    const updatedIncome = await ports.persist(income);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return updatedIncome.getSourceBy(incomeSource.id)!;
  };

export default addIncomeSource;
