const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    title: {
      type: String
    },
    imdbID: {
      type: String
    },
    rateValue: {
      type: Number
    }
  },
  {
    timestamps: true,
    collection: "rateMovies"
  }
);

RateSchema.index({ email: 1, imdbID: 1 }, { unique: true });
module.exports = Rate = mongoose.model("Rate", RateSchema);
