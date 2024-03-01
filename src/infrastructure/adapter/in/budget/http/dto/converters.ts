import { toDate, toIsoDate } from "../../../../../../util/date";
import { type BudgetDto, type NewBudgetDto } from "./budget";
import { ExpenseDtoConverter } from "../../../expense/http/dto/converters";
import {
  Budget,
  BudgetId,
} from "../../../../../../core/domain/model/expense/budget";
import { IncomeId } from "../../../../../../core/domain/model/income/income";
import Limit from "../../../../../../core/domain/model/expense/limit";

export const NewBudgetDtoConverter = {
  toDomain: (dto: NewBudgetDto): Budget =>
    new Budget(
      new BudgetId(),
      new IncomeId(dto.incomeId),
      dto.name,
      new Limit(dto.limit),
      [],
      toDate(dto.startDate),
      toDate(dto.endDate),
    ),
};

export const BudgetDtoConverter = {
  toDto: (domain: Budget): BudgetDto => ({
    id: domain.id.value,
    incomeId: domain.incomeId.value,
    limit: domain.limit.amount,
    expenses: domain.expenses.map(ExpenseDtoConverter.toDto),
    name: domain.name,
    startDate: toIsoDate(domain.startDate),
    endDate: toIsoDate(domain.endDate),
  }),
};
