const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        requires: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        requires: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        defaut: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);