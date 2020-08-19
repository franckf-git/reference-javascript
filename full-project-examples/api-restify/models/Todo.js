const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['attente', 'en cours', 'terminée']
        }],
        default: ['attente']
    }
});

module.exports = mongoose.model('Tasks', taskSchema);