import mongoose, { Schema } from "mongoose";
import { ExpenseDto } from "../../../router/dto/expense";

const Types = Schema.Types;

const expenseSchema = new mongoose.Schema<ExpenseDto>(
  {
    id: Types.String,
    description: Types.String,
    amount: Types.Number,
    date: Types.Date,
  },
  { strict: true, _id: false },
);

export default expenseSchema;
