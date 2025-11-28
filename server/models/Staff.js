import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    StaffName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work : {
    type: String,
    required: true,
},

});

export const Staffdata = mongoose.model("Staffdata", StaffSchema);


