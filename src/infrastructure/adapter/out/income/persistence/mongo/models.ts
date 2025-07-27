import mongoose from "mongoose";
import type IncomeStreamEntity from "./entity/IncomeStreamEntity";
import incomeStreamSchema from "./schema/incomeSchema";

export const IncomeStreamModel = mongoose.model<IncomeStreamEntity>(
  "IncomeStream",
  incomeStreamSchema,
  "income-streams",
);
