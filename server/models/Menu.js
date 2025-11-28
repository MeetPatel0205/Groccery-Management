import mongoose from "mongoose";

const FoodMenuSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    required: true,
  },
  FoodPrice: {
    type: String,
    required: true,
  },
  Quantities: {
    type: Number,
    required: true,
  },
  FoodAbout: {
    type: String,
    required: true,
  },
  image : {
    type: String,
    required: true,
},
  FoodCategory: {
    type: String,
    required: true,
  },
  FoodStatus: {
    type: String,
    required: true,
  },
});

export const FoodMenu = mongoose.model("FoodMenu", FoodMenuSchema);


