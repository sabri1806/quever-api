const express = require("express");

const connectDB = require("./config/db");
const cors = require("cors");

// routes
const movies = require("./routes/api/favorites-movies");
const watchLaterMovies = require("./routes/api/watch-later");
const rateMovies = require("./routes/api/rate");

const app = express();

//connect db
connectDB();

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.send("Hello world! Im Saa in quever app, and I hope that work fine :P ")
);

// use Routes
app.use("/api/favorites-movies", movies);
app.use("/api/watch-later", watchLaterMovies);
app.use("/api", rateMovies);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
