import mongoose from "mongoose";
import incomeSchema from "./schema/incomeSchema";
import { IncomeDto } from "../../../../in/income/http/dto/income";

export const IncomeModel = mongoose.model<IncomeDto>(
  "Income",
  incomeSchema,
  "incomes",
);
