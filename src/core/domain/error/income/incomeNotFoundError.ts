import type { IncomeStreamId } from "../../model/income/incomeStream";
import { Error } from "mongoose";

class IncomeNotFoundError extends Error {
  constructor(public readonly incomeId: IncomeStreamId) {
    super(`Income with id ${incomeId.value} does not exist`);
  }
}

export default IncomeNotFoundError;
