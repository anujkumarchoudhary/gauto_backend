import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
});

export default mongoose.model("Service", schema);
