const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    ticketId: { type: String, required: true },
    version: { type: String, required: true },
    annotations: { type: String, required: true },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);