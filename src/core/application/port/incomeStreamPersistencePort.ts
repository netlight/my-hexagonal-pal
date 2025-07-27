import type {
  IncomeStream,
  IncomeStreamId,
} from "../../domain/model/income/incomeStream";

interface IncomeStreamPersistencePort {
  findBy: (id: IncomeStreamId) => Promise<IncomeStream | undefined>;
  findAll: () => Promise<IncomeStream[]>;
  persist: (income: IncomeStream) => Promise<IncomeStream>;
}

export default IncomeStreamPersistencePort;
