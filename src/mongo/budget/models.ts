import mongoose from "mongoose";
import budgetSchema from "./schema/budgetSchema";
import { BudgetDto } from "../../router/dto/budget";

export const BudgetModel = mongoose.model<BudgetDto>(
  "Budget",
  budgetSchema,
  "budgets",
);
