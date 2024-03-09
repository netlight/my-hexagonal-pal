import { UniqueId } from "../uniqueId";
import { type IncomeSource, type IncomeSourceId } from "./incomeSource";

export class IncomeId extends UniqueId {}

export class Income {
  constructor(
    public readonly id: IncomeId,
    public name: string,
    public sources: IncomeSource[],
  ) {}

  get totalIncome(): number {
    return this.sources.reduce((prev, curr) => prev + curr.amount, 0);
  }

  add(source: IncomeSource): void {
    this.sources.push(source);
  }

  getSourceBy(id: IncomeSourceId): IncomeSource | undefined {
    return this.sources.find((source) => source.id.value === id.value);
  }
}
