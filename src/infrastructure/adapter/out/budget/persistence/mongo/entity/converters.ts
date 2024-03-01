import type BudgetEntity from "./budgetEntity";
import {
  Budget,
  BudgetId,
} from "../../../../../../../core/domain/model/expense/budget";
import Limit from "../../../../../../../core/domain/model/expense/limit";
import { IncomeId } from "../../../../../../../core/domain/model/income/income";
import {
  Expense,
  ExpenseId,
} from "../../../../../../../core/domain/model/expense/expense";
import type ExpenseEntity from "./expenseEntity";

export const BudgetEntityConverter = {
  toEntity: (domain: Budget): BudgetEntity => ({
    id: domain.id.value,
    incomeId: domain.incomeId.value,
    name: domain.name,
    limit: domain.limit.amount,
    expenses: domain.expenses.map(ExpenseEntityConverter.toEntity),
    startDate: domain.startDate,
    endDate: domain.endDate,
  }),
  toDomain: (entity: BudgetEntity): Budget =>
    new Budget(
      new BudgetId(entity.id),
      new IncomeId(entity.incomeId),
      entity.name,
      new Limit(entity.limit),
      entity.expenses.map(ExpenseEntityConverter.toDomain),
      entity.startDate,
      entity.endDate,
    ),
};

export const ExpenseEntityConverter = {
  toEntity: (domain: Expense): ExpenseEntity => ({
    id: domain.id.value,
    description: domain.description,
    amount: domain.amount,
    date: domain.date,
  }),
  toDomain: (entity: ExpenseEntity): Expense =>
    new Expense(
      new ExpenseId(entity.id),
      entity.description,
      entity.amount,
      entity.date,
    ),
};
