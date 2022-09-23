import mongoose from "mongoose";
const date = new Date();
const PastriesWonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  playedAt: { type: Date, default: date },
  pastries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pastries" }],
});

export const PastriesWonModel = mongoose.model(
  "PastriesWon",
  PastriesWonSchema
);
