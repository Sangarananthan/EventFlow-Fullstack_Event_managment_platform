import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: function () {
        return !this.isGuest;
      }, // Only required for non-guests
    },
    password: {
      type: String,
      required: function () {
        return !this.isGuest;
      }, // Only required for non-guests
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
