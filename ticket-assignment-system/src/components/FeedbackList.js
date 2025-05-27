import React, { useEffect, useState } from 'react';

const FeedbackList = ({ ticketId, version }) => {
    const [feedback, setFeedback] = useState([]);
    const url = 'http://localhost:5000';

    useEffect(() => {
        const fetchFeedback = async () => {
            const response = await fetch(`${url}/feedback/${ticketId}/${version}`);
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