import type {
  EarningDto,
  IncomeStreamDto,
  NewEarning,
  NewIncomeStreamDto,
} from "./income";
import {
  IncomeStream,
  IncomeStreamId,
} from "../../../../../../core/domain/model/income/incomeStream";
import {
  Earning,
  EarningId,
} from "../../../../../../core/domain/model/income/earning";

export const IncomeStreamDtoConverter = {
  toDomain: (dto: NewIncomeStreamDto): IncomeStream =>
    new IncomeStream(new IncomeStreamId(), dto.name, []),
  toDto: (domain: IncomeStream): IncomeStreamDto => ({
    id: domain.id.value,
    name: domain.name,
    earnings: domain.earnings.map(EarningsDtoConverter.toDto),
  }),
};

export const EarningsDtoConverter = {
  toDomain: (dto: NewEarning): Earning =>
    new Earning(new EarningId(), dto.name, dto.amount),
  toDto: (domain: Earning): EarningDto => ({
    id: domain.id.value,
    name: domain.name,
    amount: domain.amount,
  }),
};
