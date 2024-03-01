import type IncomePersistencePort from "../../../../../../core/application/port/incomePersistencePort";
import { IncomeModel } from "./models";
import { IncomeEntityConverter } from "./entity/converters";

export const findById: IncomePersistencePort["getById"] = async (id) => {
  const entity = await IncomeModel.findOne({ id: id.value });
  if (entity !== null) {
    return IncomeEntityConverter.toDomain(entity);
  }
};

export const findAll: IncomePersistencePort["getAll"] = async () => {
  const entities = await IncomeModel.find();
  return entities.map(IncomeEntityConverter.toDomain);
};

export const insert: IncomePersistencePort["persist"] = async (income) => {
  const entity = IncomeEntityConverter.toEntity(income);
  const model = new IncomeModel(entity);
  const insertedEntity = await model.save();
  return IncomeEntityConverter.toDomain(insertedEntity);
};

const IncomeMongoPersistenceAdapter: IncomePersistencePort = {
  getById: findById,
  getAll: findAll,
  persist: insert,
};

export default IncomeMongoPersistenceAdapter;
