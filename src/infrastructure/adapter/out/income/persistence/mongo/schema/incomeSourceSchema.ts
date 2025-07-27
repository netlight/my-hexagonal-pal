import mongoose, { Schema } from "mongoose";
import type IncomeSourceEntity from "../entity/IncomeSourceEntity";

const {Types} = Schema;

const incomeSourceSchema = new mongoose.Schema<IncomeSourceEntity>(
  {
    id: Types.UUID,
    name: Types.String,
    amount: Types.Number,
  },
  { strict: true, _id: false },
);

export default incomeSourceSchema;
