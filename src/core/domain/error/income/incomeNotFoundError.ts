import { IncomeId } from "../../model/income/income";
import { Error } from "mongoose";

class IncomeNotFoundError extends Error {
  constructor(public readonly incomeId: IncomeId) {
    super(`Income with id ${incomeId.value} does not exist`);
  }
}

export default IncomeNotFoundError;
