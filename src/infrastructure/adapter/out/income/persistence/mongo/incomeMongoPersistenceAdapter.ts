import type IncomeStreamPersistencePort from "../../../../../../core/application/port/incomeStreamPersistencePort";
import { IncomeStreamModel } from "./models";
import { IncomeEntityConverter } from "./entity/converters";

export const findById: IncomeStreamPersistencePort["findBy"] = async (id) => {
  const entity = await IncomeStreamModel.findOne({ id: id.value });
  if (entity !== null) {
    return IncomeEntityConverter.toDomain(entity);
  }
  return undefined;
};

export const findAll: IncomeStreamPersistencePort["findAll"] = async () => {
  const entities = await IncomeStreamModel.find();
  return entities.map(IncomeEntityConverter.toDomain);
};

export const upsert: IncomeStreamPersistencePort["persist"] = async (
  income,
) => {
  const entity = IncomeEntityConverter.toEntity(income);
  const upserted = await IncomeStreamModel.findOneAndUpdate(
    { id: entity.id },
    entity,
    {
      upsert: true,
      returnDocument: "after",
    },
  );
  return IncomeEntityConverter.toDomain(upserted);
};

const IncomeMongoPersistenceAdapter: IncomeStreamPersistencePort = {
  findBy: findById,
  findAll,
  persist: upsert,
};

export default IncomeMongoPersistenceAdapter;
