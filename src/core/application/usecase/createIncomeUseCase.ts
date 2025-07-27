import type { Income } from "../../domain/model/income/income";
import type IncomePersistencePort from "../port/incomePersistencePort";

export type CreateIncomeUseCase = (income: Income) => Promise<Income>;

const createIncome: (ports: {
  persist: IncomePersistencePort["persist"];
}) => CreateIncomeUseCase = (ports) => async (income) => await ports.persist(income);

export default createIncome;
