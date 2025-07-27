import type IncomePersistencePort from "../../../../../../core/application/port/incomePersistencePort";
import { IncomeModel } from "./models";
import { IncomeEntityConverter } from "./entity/converters";

export const findById: IncomePersistencePort["getById"] = async (id) => {
  const entity = await IncomeModel.findOne({ id: id.value });
  if (entity !== null) {
    return IncomeEntityConverter.toDomain(entity);
  }
  return undefined;
};

export const findAll: IncomePersistencePort["getAll"] = async () => {
  const entities = await IncomeModel.find();
  return entities.map(IncomeEntityConverter.toDomain);
};

export const upsert: IncomePersistencePort["persist"] = async (income) => {
  const entity = IncomeEntityConverter.toEntity(income);
  const upserted = await IncomeModel.findOneAndUpdate(
    { id: entity.id },
    entity,
    {
      upsert: true,
      returnDocument: "after",
    },
  );
  return IncomeEntityConverter.toDomain(upserted);
};

const IncomeMongoPersistenceAdapter: IncomePersistencePort = {
  getById: findById,
  getAll: findAll,
  persist: upsert,
};

export default IncomeMongoPersistenceAdapter;
