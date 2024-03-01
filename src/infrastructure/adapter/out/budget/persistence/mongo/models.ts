import mongoose from "mongoose";
import type BudgetEntity from "./entity/budgetEntity";
import budgetSchema from "./schema/budgetSchema";

export const BudgetModel = mongoose.model<BudgetEntity>(
  "Budget",
  budgetSchema,
  "budgets",
);
