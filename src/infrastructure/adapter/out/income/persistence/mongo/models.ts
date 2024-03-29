import mongoose from "mongoose";
import type IncomeEntity from "./entity/IncomeEntity";
import incomeSchema from "./schema/incomeSchema";

export const IncomeModel = mongoose.model<IncomeEntity>(
  "Income",
  incomeSchema,
  "incomes",
);
