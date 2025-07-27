import type { IncomeStream } from "../../domain/model/income/incomeStream";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";

export type GetAllIncomeStreamsUseCase = () => Promise<IncomeStream[]>;

const getAllIncomeStreams: (ports: {
  findAllIncomeStreams: IncomeStreamPersistencePort["findAll"];
}) => GetAllIncomeStreamsUseCase = (ports) => async () =>
  await ports.findAllIncomeStreams();

export default getAllIncomeStreams;
