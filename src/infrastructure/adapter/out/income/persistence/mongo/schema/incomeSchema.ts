import mongoose, { Schema } from "mongoose";
import type IncomeStreamEntity from "../entity/IncomeStreamEntity";
import earningSchema from "./earningSchema";

const { Types } = Schema;

const incomeSchema = new mongoose.Schema<IncomeStreamEntity>(
  {
    id: Types.UUID,
    name: Types.String,
    earnings: [earningSchema],
  },
  { strict: true, timestamps: true, versionKey: false },
);

export default incomeSchema;
