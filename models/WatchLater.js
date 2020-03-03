const mongoose = require("mongoose");

const WatchLaterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    omDBId: {
      type: String
    },
    poster: {
      type: String
    },
    title: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

WatchLaterSchema.index({ email: 1, omDBId: 1 }, { unique: true });

module.exports = WatchLater = mongoose.model("WatchLater", WatchLaterSchema);
