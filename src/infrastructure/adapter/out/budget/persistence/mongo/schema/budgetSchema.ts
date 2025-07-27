import mongoose, { Schema } from "mongoose";
import type BudgetEntity from "../entity/budgetEntity";
import expenseSchema from "./expenseSchema";

const { Types } = Schema;

const budgetSummarySchema = new mongoose.Schema<BudgetEntity>(
  {
    id: Types.UUID,
    name: Types.String,
    limit: Types.Number,
    expenses: [expenseSchema],
    startDate: Types.Date,
    endDate: Types.Date,
  },
  { strict: true, timestamps: true, versionKey: false },
);

export default budgetSummarySchema;
