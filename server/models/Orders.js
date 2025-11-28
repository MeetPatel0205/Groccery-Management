import mongoose from "mongoose";
import { boolean } from "zod";

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  order_data: {
    type: Array,
    required: true,
  },
});

export const OrderData = mongoose.model("Order", OrderSchema);
