import type {
  IncomeStream,
  IncomeStreamId,
} from "../../domain/model/income/incomeStream";
import type IncomeStreamPersistencePort from "../port/incomeStreamPersistencePort";

type FindIncomeStreamUseCase = (
  incomeStreamId: IncomeStreamId,
) => Promise<IncomeStream | undefined>;

const findIncomeStreams: (ports: {
  findBy: IncomeStreamPersistencePort["findBy"];
}) => FindIncomeStreamUseCase = (ports) => async (incomeStreamId) =>
  await ports.findBy(incomeStreamId);

export default findIncomeStreams;
