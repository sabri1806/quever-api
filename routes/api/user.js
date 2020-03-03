const express = require("express");
const router = express.Router();

//load model
let user = require("../../models/User");

//test route
router.get("/test-user", (req, res) => res.send("user route testing!"));

module.exports = router;
