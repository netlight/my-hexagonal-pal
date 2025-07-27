import type { Income } from "../../domain/model/income/income";
import type IncomePersistencePort from "../port/incomePersistencePort";

export type GetIncomesUseCase = () => Promise<Income[]>;

const getIncomes: (ports: {
  getAllIncomes: IncomePersistencePort["getAll"];
}) => GetIncomesUseCase = (ports) => async () => await ports.getAllIncomes();

export default getIncomes;
