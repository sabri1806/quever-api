const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema(
  {
    moviename: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    description: {
      type: String
    },
    genre: {
      type: String
    },
    year: {
      type: String
    },
    cast: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = Favourite = mongoose.model("Favourite", FavouriteSchema);
