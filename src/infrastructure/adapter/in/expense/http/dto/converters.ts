import type { ExpenseDto, NewExpenseDto } from "./expense";
import {
  Expense,
  ExpenseId,
} from "../../../../../../core/domain/model/expense/expense";

export const NewExpenseDtoConverter = {
  toDomain: (dto: NewExpenseDto): Expense =>
    new Expense(
      new ExpenseId(),
      dto.description,
      dto.amount,
      new Date(dto.date),
    ),
};

export const ExpenseDtoConverter = {
  toDto: (domain: Expense): ExpenseDto => ({
    id: domain.id.value,
    amount: domain.amount,
    description: domain.description,
    date: domain.date.toISOString(),
  }),
};
