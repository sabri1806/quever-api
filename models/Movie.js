const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({

    moviename: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

//const movie = mongoose.model('movie',MovieSchema );
//module.exports = movie;
module.exports = Movie = mongoose.model('Movie', MovieSchema);