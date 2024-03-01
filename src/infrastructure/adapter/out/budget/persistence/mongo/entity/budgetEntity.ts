import type ExpenseEntity from "./expenseEntity";

interface BudgetEntity {
  id: string;
  incomeId: string;
  name: string;
  limit: number;
  expenses: ExpenseEntity[];
  startDate?: Date;
  endDate?: Date;
}

export default BudgetEntity;
