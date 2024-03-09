import mongoose, { Schema } from "mongoose";
import expenseSchema from "./expenseSchema";
import { BudgetDto } from "../../../../../in/budget/http/dto/budget";

const Types = Schema.Types;

const budgetSummarySchema = new mongoose.Schema<BudgetDto>(
  {
    id: Types.String,
    incomeId: Types.String,
    name: Types.String,
    limit: Types.Number,
    expenses: [expenseSchema],
    startDate: Types.Date,
    endDate: Types.Date,
  },
  { strict: true, timestamps: true, versionKey: false },
);

export default budgetSummarySchema;
