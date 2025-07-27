import type ExpenseEntity from "./expenseEntity";

interface BudgetEntity {
  id: string;
  name: string;
  limit: number;
  expenses: ExpenseEntity[];
  startDate?: Date;
  endDate?: Date;
}

export default BudgetEntity;
