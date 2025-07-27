import type { Income, IncomeId } from "../../domain/model/income/income";

interface IncomePersistencePort {
  getById: (id: IncomeId) => Promise<Income | undefined>;
  getAll: () => Promise<Income[]>;
  persist: (income: Income) => Promise<Income>;
}

export default IncomePersistencePort;
