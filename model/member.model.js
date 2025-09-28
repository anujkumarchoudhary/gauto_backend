import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: true },
  experience: { type: String, required: true },
});

export default mongoose.model("Member", schema);
