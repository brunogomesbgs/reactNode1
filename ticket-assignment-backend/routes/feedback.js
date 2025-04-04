const express = require('express');
const router = express.Router();
const Feedback = require('../model/Feedback');

// Create feedback
router.post('/', async (req, res) => {
    const { ticketId, version, annotations, feedback } = req.body;
    const newFeedback = new Feedback({ ticketId, version, annotations, feedback });
    await newFeedback.save();
    res.status(201).json(newFeedback);
});

// Get feedback by ticketId and version
router.get('/:ticketId/:version', async (req, res) => {
    const { ticketId, version } = req.params;
    const feedback = await Feedback.find({ ticketId, version });
    res.json(feedback);
});

module.exports = router;