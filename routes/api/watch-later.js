const express = require("express");
const router = express.Router();

//load model
let WatchLater = require("../../models/WatchLaterMovie");

//test route
router.get("/test-quever-list", (req, res) =>
  res.send("movie route que ver list testing!")
);

// @route GET api/watch-later
// @description get all watch later movie list
// @access Public
router.get("/all-watch-later", (req, res) => {
  WatchLater.find()
    .then(watchlater => res.json(watchlater))
    .catch(err =>
      res
        .status(404)
        .json({ nowatchlaterlistfound: "No watch later movies list found." })
    );
});

const handleCreateWatchLater = (req, res) => {
  const watchLater = {
    email: `${req.body.email}`,
    omDBId: `${req.body.omDBId}`,
    poster: `${req.body.poster}`
  };
  const newWatchLaterMovie = new WatchLater(watchLater);
  newWatchLaterMovie
    .save()
    .then(() => res.json("Watch later content added successfully."))
    .catch(err => res.status(400).json("Error: " + err));
};

// @route POST api/watch-later
// @description add/save watch later movie
// @access Public
router.post("/add-watch-later-movie", handleCreateWatchLater);

// @route DELETE api/watch-later
// @description delete one watch later movie
// @access Public
router.delete("/delete-watch-later-movie/:id", (req, res) => {
  WatchLater.findByIdAndRemove(req.params.id, req.body)
    .then(watchLater =>
      res.json({ mgs: "Watch later movie delete successfully" })
    )
    .catch(err => res.status(404).json({ error: "Couldn't remove movie" }));
});

// @route DELETE api/watch-later
// @description delete all watch later movie
// @access Public
router.delete("/delete-all-watch-later-movie", (req, res) => {
  WatchLater.deleteMany({}, () => {
    res
      .status(200)
      .json({ msg: "All Watch later movies was delete successfully" });
  }).catch(err =>
    res.status(404).json({ error: "Couldn't remove all movies" })
  );
});
module.exports = router;
