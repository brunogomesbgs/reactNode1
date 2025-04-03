import React, { useEffect, useState } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('http://localhost:5000/tickets');
            const data = await response.json();
            setTickets(data);
        };
        fetchTickets();
    }, []);

    const handleTicketSubmit = (ticket) => {
        setTickets([...tickets, ticket]);
    };

    const handleFeedbackSubmit = (feedback) => {
        // Handle feedback submission if needed
    };

    return (
        <div>
            <h1>Ticket Assignment System</h1>
            <TicketForm onSubmit={handleTicketSubmit} />
            <TicketList tickets={tickets} onSelect={setSelectedTicket} />
            {selectedTicket && (
                <div>
                    <h2>Feedback for Ticket {selectedTicket.id} Version 1</h2>
                    <FeedbackForm ticketId={selectedTicket.id} version="1" onSubmit={handleFeedbackSubmit} />
                    <FeedbackList ticketId={selectedTicket.id} version="1" />
                </div>
            )}
        </div>
    );
};

export default App;