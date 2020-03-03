const express = require("express");
const router = express.Router();
const mailService = require("../../services/MailService")();

// Load Favourite model
let Favourite = require("../../models/Favourite");

// @route GET api/favorites-movies/test
// @description tests favourite movies route
// @access Public
router.get("/test", (req, res) => res.send("movie route testing!"));

// @route GET api/favorites-movies
// @description Get all favourites movies
// @access Public
router.get("/", (req, res) => {
  Favourite.find()
    .then(movies => res.json(movies))
    .catch(err =>
      res.status(404).json({ nomoviesfound: "No FavouriteS Movies found" })
    );
});
// @route POST api/favorites-movies/share-favourites
// @description share favourites
// @access Public
router.post("/share-favourites", (req, res) => {
  Favourite.find({ email: req.body.email }).then(movies => {
    mailService.sendMail(req.body, movies);
  });
  res.status(200).json({ message: "mail sent ok" });
});

// @route GET api/favorites-movies/:id
// @description Get single favourite movie by id
// @access Public
router.get("/:id", (req, res) => {
  Favourite.findById(req.params.id)
    .then(movie => {
      return res.json(movie);
    })
    .catch(err => res.status(404).json({ nomoviefound: "No Movie found" }));
});

// @route POST api/favorites-movies
// @description add/save favourite movie
// @access Public
router.post("/", (req, res) => {
  const newFavourite = new Favourite(req.body);

  newFavourite
    .save()
    .then(() => res.json("Movie Added!!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route PUT api/favorites-movies/:id
// @description Update favourite-movie
// @access Public
router.put("/:id", (req, res) => {
  const filter = { _id: req.params.id };
  Favourite.findOneAndUpdate(filter, req.body)
    .then(movie => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/favorites-movies/:id
// @description Delete favourite movie by id
// @access Public
router.delete("/:id", (req, res) => {
  Favourite.findByIdAndRemove(req.params.id, req.body)
    .then(movie => res.json({ mgs: "Movie entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such a movie" }));
});

module.exports = router;
