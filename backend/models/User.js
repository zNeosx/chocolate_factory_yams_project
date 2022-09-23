import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  // pastries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pastries" }],
  createdAt: { type: Date, default: Date.now() },
});

export const UserModel = mongoose.model("User", UserSchema);
