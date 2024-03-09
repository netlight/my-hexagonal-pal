import type BudgetPersistencePort from "../../../../../../core/application/port/budgetPersistencePort";
import { BudgetEntityConverter } from "./entity/converters";
import { BudgetModel } from "./models";
import BudgetEntity from "./entity/budgetEntity";

export const upsert: BudgetPersistencePort["persist"] = async (summary) => {
  const entity = BudgetEntityConverter.toEntity(summary);
  const upserted = <BudgetEntity>await BudgetModel.findOneAndUpdate(
    { id: entity.id },
    entity,
    {
      upsert: true,
      returnDocument: "after",
    },
  );
  return BudgetEntityConverter.toDomain(upserted);
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

const BudgetMongoPersistenceAdapter: BudgetPersistencePort = {
  getById: findById,
  getByExpenseId: findByExpenseId,
  getAllByIncomeId: findAllByIncomeId,
  persist: upsert,
};

export default BudgetMongoPersistenceAdapter;
