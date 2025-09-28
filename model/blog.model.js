import mongoose, { Mongoose, Schema } from "mongoose";

const schema = new Schema(
  {
    image: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    comments: { type: String, required: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", schema);
