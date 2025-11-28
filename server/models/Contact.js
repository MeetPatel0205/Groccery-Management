import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const ContactModel = mongoose.model("ContactData", ContactSchema);
