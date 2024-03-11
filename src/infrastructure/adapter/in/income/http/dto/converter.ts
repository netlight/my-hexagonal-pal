import {
  type IncomeDto,
  type IncomeSourceDto,
  type NewIncomeDto,
  type NewIncomeSourceDto,
} from "./income";
import {
  Income,
  IncomeId,
} from "../../../../../../core/domain/model/income/income";
import {
  IncomeSource,
  IncomeSourceId,
} from "../../../../../../core/domain/model/income/incomeSource";

export const IncomeDtoConverter = {
  toDomain: (dto: NewIncomeDto): Income =>
    new Income(new IncomeId(), dto.name, []),
  toDto: (domain: Income): IncomeDto => ({
    id: domain.id.value,
    name: domain.name,
    sources: domain.sources.map(IncomeSourceDtoConverter.toDto),
  }),
};

export const IncomeSourceDtoConverter = {
  toDomain: (dto: NewIncomeSourceDto): IncomeSource =>
    new IncomeSource(new IncomeSourceId(), dto.name, dto.amount),
  toDto: (domain: IncomeSource): IncomeSourceDto => ({
    id: domain.id.value,
    name: domain.name,
    amount: domain.amount,
  }),
};
