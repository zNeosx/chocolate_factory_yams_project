import mongoose from "mongoose";

const PastriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

export const PastriesModel = mongoose.model("Pastries", PastriesSchema);
