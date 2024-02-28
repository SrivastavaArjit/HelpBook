import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  uid: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  birthday: { type: String },
  hashedPassword: { type: String },
  fbIntegration: { type: Boolean },
  rememberMe: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
