import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: false },
  rent: { type: String, required: true },
  make: { type: String, required: false },
  model: { type: String, required: false },
  brand: { type: String, required: false },
  gear: { type: String, required: false, enum: ["Automatic", "Manual"] },
  drive: { type: String, required: false },
  description: { type: String, required: false },
  type: { type: String, required: true, enum: ["Sale", "Purchase"] },
  from: { type: String, required: true },
  to: { type: String, required: true },
  isAc: { type: Boolean, required: true },
  date: { type: String, default: new Date() },
  time: { type: String, required: true },
});

export default mongoose.model("Car", schema);
