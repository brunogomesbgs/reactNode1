import React, { useState } from 'react';

const FeedbackForm = ({ ticketId, version, onSubmit }) => {
    const [annotations, setAnnotations] = useState('');
    const [feedback, setFeedback] = useState('');
    const url = 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticketId, version, annotations, feedback }),
        });
        const data = await response.json();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Annotations:</label>
                <textarea value={annotations} onChange={(e) => setAnnotations(e.target.value)} />
            </div>
            <div>
                <label>Feedback:</label>
                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;