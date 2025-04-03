import React, { useEffect, useState } from 'react';

const FeedbackList = ({ ticketId, version }) => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            const response = await fetch(`http://localhost:5000/feedback/${ticketId}/${version}`);
            const data = await response.json();
            setFeedback(data);
        };
        fetchFeedback();
    }, [ticketId, version]);

    return (
        <div>
            <h2>Feedback</h2>
            <ul>
                {feedback.map((fb, index) => (
                    <li key={index}>
                        <p>Annotations: {fb.annotations}</p>
                        <p>Feedback: {fb.feedback}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;