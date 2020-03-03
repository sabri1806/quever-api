const express = require("express");

const connectDB = require("./config/db");
const cors = require("cors");

// routes
const favourites = require("./routes/api/favorites-movies");
const watchLater = require("./routes/api/watch-later");
const rate = require("./routes/api/rate");
const usr = require("./routes/api/user");

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
app.use("/api/favorites-movies", favourites);
app.use("/api/watch-later", watchLater);
app.use("/api", rate);
app.use("/api/user", usr);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
