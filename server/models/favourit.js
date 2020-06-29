const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favouritSchema = new Schema({
    title: String,
    poster_path: String,
    id: Number
});

module.exports = mongoose.model('favourit', favouritSchema, 'favouritList');
