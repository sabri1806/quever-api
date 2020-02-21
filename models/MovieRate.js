const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    imdbID: {
      type: String
    },
    rateValue: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

RateSchema.index({ email: 1, imdbId: 1 }, { unique: true });
module.exports = MovieRate = mongoose.model("MovieRate", RateSchema);
