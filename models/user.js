const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortener');

const userSchema= new mongoose.Schema({
    url:String,
    stringGenerated : String
})

module.exports = mongoose.model('User', userSchema);
