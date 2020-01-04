const express = require('express');
//const cors = require('cors');
//const mongoose = require('mongoose');
const connectDB = require('./config/db');
// routes
const movies = require('./routes/api/movies');

const app = express();


//connect db 
connectDB();

//middleware
//app.use(cors());
//app.use(express.json());

app.get('/', (req, res) => res.send('Hello world! Im Saa in quever app, and I hope that work fine :P '));

// use Routes
app.use('/api/movies', movies);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));