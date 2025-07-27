import type { IncomeStream } from "../../domain/model/income/incomeStream";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";

export type OpenNewIncomeStreamUseCase = (
  income: IncomeStream,
) => Promise<IncomeStream>;

const openNewIncomeStream: (ports: {
  persist: IncomeStreamPersistencePort["persist"];
}) => OpenNewIncomeStreamUseCase = (ports) => async (income) =>
  await ports.persist(income);

export default openNewIncomeStream;
