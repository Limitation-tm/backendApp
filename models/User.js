import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      requared: true,
    },
    email: {
      type: String,
      requared: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      requared: true,
    },
    role: {
      type: String,
      default: "User",
    },
    avatarUrl: String,
  },
  { tymeStamps: true }
);

export default mongoose.model("User", UserSchema);
