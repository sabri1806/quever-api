const express = require("express");
const router = express.Router();

//load model
let MovieRate = require("../../models/MovieRate");

const handleSaveRateMovie = (req, res) => {
  const rate = {
    email: `${req.body.email}`,
    imdbID: `${req.body.imdbID}`,
    rateValue: `${req.body.rateValue}`
  };

  const newRateMovie = new MovieRate(rate);
  newRateMovie
    .save()
    .then(() => res.json("Rate movie added successfully"))
    .catch(err => res.status(400).json("Error: " + err));
};

router.post("/save-rate-movie", handleSaveRateMovie);

module.exports = router;
