import type BudgetPersistencePort from "../../../../../../core/application/port/budgetPersistencePort";
import { BudgetEntityConverter } from "./entity/converters";
import { BudgetModel } from "./models";
import type {
  Budget,
  BudgetId,
} from "../../../../../../core/domain/model/expense/budget";
import type { ExpenseId } from "../../../../../../core/domain/model/expense/expense";

export class BudgetMongoPersistenceAdapter implements BudgetPersistencePort {
  persist = async (budget: Budget): Promise<Budget> => {
    const entity = BudgetEntityConverter.toEntity(budget);
    const upserted = await BudgetModel.findOneAndUpdate(
      { id: entity.id },
      entity,
      {
        upsert: true,
        returnDocument: "after",
      },
    );
    return BudgetEntityConverter.toDomain(upserted);
  };

  findAll = async (): Promise<Budget[]> => {
    const entities = await BudgetModel.find();
    return entities.map(BudgetEntityConverter.toDomain);
  };

  findBy = async (id: BudgetId): Promise<Budget | undefined> => {
    const entity = await BudgetModel.findOne({ id: id.value });
    if (entity !== null) {
      return BudgetEntityConverter.toDomain(entity);
    }
    return undefined;
  };

  findForExpenseId = async (id: ExpenseId): Promise<Budget | undefined> => {
    const entity = await BudgetModel.findOne({ "expenses.id": id.value });
    if (entity !== null) {
      return BudgetEntityConverter.toDomain(entity);
    }
    return undefined;
  };
}
