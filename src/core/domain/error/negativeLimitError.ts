class NegativeLimitError extends Error {
  constructor(public readonly amount: number) {
    super(`Limits cannot be negative: ${amount}`);
  }
}

export default NegativeLimitError;
