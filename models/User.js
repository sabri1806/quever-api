const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String
    },
    dateLastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);
module.exports = User = mongoose.model("User", UserSchema);
