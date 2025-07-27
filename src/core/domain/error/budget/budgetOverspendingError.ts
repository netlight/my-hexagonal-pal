class BudgetOverspendingError extends Error {
  constructor(
    public readonly sumOfAllIncomeStreams: number,
    public readonly totalSpent: number,
  ) {
    super(
      `Sum of budget expenses (${totalSpent}) is bigger than the sum of all income streams (${sumOfAllIncomeStreams})`,
    );
  }
}

export default BudgetOverspendingError;
