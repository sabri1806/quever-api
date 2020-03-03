const express = require("express");
const router = express.Router();

//load model
let Rate = require("../../models/Rate");

const handleSaveRateMovie = (req, res) => {
  const rate = {
    email: `${req.body.email}`,
    imdbID: `${req.body.imdbID}`,
    rateValue: `${req.body.rateValue}`
  };

  const newRate = new Rate(rate);
  newRate
    .save()
    .then(() => res.json("Rate movie added successfully"))
    .catch(err => res.status(400).json("Error: " + err));
};

router.post("/rate/movies", handleSaveRateMovie);

const calculateRate = (req, res) => {
  console.log(req.params.imdbID);

  //Rate.findById(req.params.imdbID);
  Rate.find({ imdbID: req.params.imdbID }, (err, movieRates) => {
    if (err) {
      console.error(err);
      res.status(500).json(error);
    }

    const sum = movieRates.reduce((acum, movie) => {
      return movie.rateValue + acum;
    }, 0);

    const average = sum / movieRates.length;
    res.json({ message: "OK", average: average });
  });
};

router.get("/rate/movies/:imdbID", calculateRate);

module.exports = router;
