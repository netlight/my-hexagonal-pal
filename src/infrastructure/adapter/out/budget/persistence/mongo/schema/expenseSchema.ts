import mongoose, { Schema } from "mongoose";
import type ExpenseEntity from "../entity/expenseEntity";

const {Types} = Schema;

const expenseSchema = new mongoose.Schema<ExpenseEntity>(
  {
    id: Types.UUID,
    description: Types.String,
    amount: Types.Number,
    date: Types.Date,
  },
  { strict: true, _id: false },
);

export default expenseSchema;
