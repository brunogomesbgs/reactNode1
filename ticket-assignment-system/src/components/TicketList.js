import React from 'react';

const TicketList = ({ tickets, onSelect }) => {
    return (
        <div>
            <h2>Ticket List</h2>
            <ul>
                {tickets.map((ticket, index) => (
                    <li key={index} onClick={() => onSelect(ticket)}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.description}</p>
                        <p>Deadline: {ticket.deadline}</p>
                        <p>Assigned to: {ticket.teamMember}</p>
                        <p>Status: {ticket.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketList;