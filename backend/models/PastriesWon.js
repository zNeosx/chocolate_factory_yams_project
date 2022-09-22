import mongoose from "mongoose";
const date = new Date();
const PastriesWonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  winnerName: { type: String },
  winnerFirstname: { type: String },
  createdAt: {
    type: String,
    default:
      date.getDate() +
      "-" +
      date.getMonth() +
      "-" +
      date.getFullYear() +
      " à " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds(),
  },
});

export const PastriesWonModel = mongoose.model(
  "PastriesWon",
  PastriesWonSchema
);
