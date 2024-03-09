import NegativeLimitError from "../../error/negativeLimitError";

class Limit {
  constructor(public amount: number) {
    if (amount < 0) {
      throw new NegativeLimitError(amount);
    }
  }
}

export default Limit;
