import { UniqueId } from "../uniqueId";
import type { Earning, EarningId } from "./earning";

export class IncomeStreamId extends UniqueId {}

export class IncomeStream {
  constructor(
    public readonly id: IncomeStreamId,
    public name: string,
    public earnings: Earning[],
  ) {}

  get totalIncome(): number {
    return this.earnings.reduce((prev, curr) => prev + curr.amount, 0);
  }

  add(earning: Earning): void {
    this.earnings.push(earning);
  }

  findEarningBy(id: EarningId): Earning | undefined {
    return this.earnings.find((earning) => earning.id.value === id.value);
  }
}
