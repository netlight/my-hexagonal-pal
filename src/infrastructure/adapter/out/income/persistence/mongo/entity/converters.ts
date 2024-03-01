import {
  Income,
  IncomeId,
} from "../../../../../../../core/domain/model/income/income";
import type IncomeEntity from "./IncomeEntity";
import {
  IncomeSource,
  IncomeSourceId,
} from "../../../../../../../core/domain/model/income/incomeSource";
import type IncomeSourceEntity from "./IncomeSourceEntity";

export const IncomeEntityConverter = {
  toEntity: (domain: Income): IncomeEntity => ({
    id: domain.id.value,
    name: domain.name,
    sources: domain.sources.map(IncomeSourceEntityConverter.toEntity),
  }),
  toDomain: (entity: IncomeEntity): Income =>
    new Income(
      new IncomeId(entity.id),
      entity.name,
      entity.sources.map(IncomeSourceEntityConverter.toDomain),
    ),
};

export const IncomeSourceEntityConverter = {
  toEntity: (domain: IncomeSource): IncomeSourceEntity => ({
    id: domain.id.value,
    name: domain.name,
    amount: domain.amount,
  }),
  toDomain: (entity: IncomeSourceEntity): IncomeSource =>
    new IncomeSource(new IncomeSourceId(entity.id), entity.name, entity.amount),
};
