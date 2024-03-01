import mongoose, { Schema } from "mongoose";
import type IncomeEntity from "../entity/IncomeEntity";
import incomeSourceSchema from "./incomeSourceSchema";

const Types = Schema.Types;

const incomeSchema = new mongoose.Schema<IncomeEntity>(
  {
    id: Types.UUID,
    name: Types.String,
    sources: [incomeSourceSchema],
  },
  { strict: true, timestamps: true, versionKey: false },
);

export default incomeSchema;
