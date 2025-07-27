import mongoose, { Schema } from "mongoose";
import type EarningEntity from "../entity/EarningEntity";

const { Types } = Schema;

const earningSchema = new mongoose.Schema<EarningEntity>(
  {
    id: Types.UUID,
    name: Types.String,
    amount: Types.Number,
  },
  { strict: true, _id: false },
);

export default earningSchema;
