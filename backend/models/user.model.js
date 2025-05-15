import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String, // Temporary token to allow the user to reset their password.
    resetPasswordExpiresAt: Date,
    verificationToken: String, // A 6-digit token sent to user's email to verify their account.
    verificationTokenExpiresAt: Date,
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;
