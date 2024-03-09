import mongoose, { Schema } from "mongoose";
import { IncomeSourceDto } from "../../../../../in/income/http/dto/income";

const Types = Schema.Types;

const incomeSourceSchema = new mongoose.Schema<IncomeSourceDto>(
  {
    id: Types.String,
    name: Types.String,
    amount: Types.Number,
  },
  { strict: true, _id: false },
);

export default incomeSourceSchema;
