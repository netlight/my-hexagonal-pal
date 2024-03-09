import mongoose, { Schema } from "mongoose";
import incomeSourceSchema from "./incomeSourceSchema";
import { IncomeDto } from "../../../../../in/income/http/dto/income";

const Types = Schema.Types;

const incomeSchema = new mongoose.Schema<IncomeDto>(
  {
    id: Types.String,
    name: Types.String,
    sources: [incomeSourceSchema],
  },
  { strict: true, timestamps: true, versionKey: false },
);

export default incomeSchema;
