// Category.js (Mongoose model)
import mongoose from 'mongoose';

const FoodCategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const FoodCategory = mongoose.model('FoodCategory', FoodCategorySchema);

export default FoodCategory; // Export the model
