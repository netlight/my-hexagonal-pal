import type BudgetPersistencePort from "../../../../../../core/application/port/budgetPersistencePort";
import { BudgetEntityConverter } from "./entity/converters";
import { BudgetModel } from "./models";

export const insert: BudgetPersistencePort["persist"] = async (summary) => {
  const entity = BudgetEntityConverter.toEntity(summary);
  const model = new BudgetModel(entity);
  const insertedBudget = await model.save();
  return BudgetEntityConverter.toDomain(insertedBudget);
};

export const findById: BudgetPersistencePort["getById"] = async (id) => {
  const entity = await BudgetModel.findOne({ id: id.value });
  if (entity !== null) {
    return BudgetEntityConverter.toDomain(entity);
  }
};

export const findByExpenseId: BudgetPersistencePort["getByExpenseId"] = async (
  id,
) => {
  const entity = await BudgetModel.findOne({ "expenses.id": id.value });
  if (entity !== null) {
    return BudgetEntityConverter.toDomain(entity);
  }
};

export const findAllByIncomeId: BudgetPersistencePort["getAllByIncomeId"] =
  async (id) => {
    const entities = await BudgetModel.find({ incomeId: id.value });
    return entities.map(BudgetEntityConverter.toDomain);
  };

export const findAll: BudgetPersistencePort["getAll"] = async () => {
  const entities = await BudgetModel.find();
  return entities.map(BudgetEntityConverter.toDomain);
};

const BudgetMongoPersistenceAdapter: BudgetPersistencePort = {
  getById: findById,
  getByExpenseId: findByExpenseId,
  getAllByIncomeId: findAllByIncomeId,
  getAll: findAll,
  persist: insert,
};

export default BudgetMongoPersistenceAdapter;
