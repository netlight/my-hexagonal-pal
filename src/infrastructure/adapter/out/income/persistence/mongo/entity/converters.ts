import {
  IncomeStream,
  IncomeStreamId,
} from "../../../../../../../core/domain/model/income/incomeStream";
import type IncomeStreamEntity from "./IncomeStreamEntity";
import {
  Earning,
  EarningId,
} from "../../../../../../../core/domain/model/income/earning";
import type EarningEntity from "./EarningEntity";

export const IncomeEntityConverter = {
  toEntity: (domain: IncomeStream): IncomeStreamEntity => ({
    id: domain.id.value,
    name: domain.name,
    earnings: domain.earnings.map(EarningEntityConverter.toEntity),
  }),
  toDomain: (entity: IncomeStreamEntity): IncomeStream =>
    new IncomeStream(
      new IncomeStreamId(entity.id),
      entity.name,
      entity.earnings.map(EarningEntityConverter.toDomain),
    ),
};

export const EarningEntityConverter = {
  toEntity: (domain: Earning): EarningEntity => ({
    id: domain.id.value,
    name: domain.name,
    amount: domain.amount,
  }),
  toDomain: (entity: EarningEntity): Earning =>
    new Earning(new EarningId(entity.id), entity.name, entity.amount),
};
