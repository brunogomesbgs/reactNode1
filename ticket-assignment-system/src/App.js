import React, { useEffect, useState } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

const App = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('http://localhost:5000/tickets');
            const data = await response.json();
            setTickets(data);
        };
        fetchTickets();
    }, []);

    const handleSubmit = (ticket) => {
        setTickets([...tickets, ticket]);
    };

    return (
        <div>
            <h1>Ticket Assignment System</h1>
            <TicketForm onSubmit={handleSubmit} />
            <TicketList tickets={tickets} />
        </div>
    );
};

export default App;