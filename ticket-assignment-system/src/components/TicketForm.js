import React, { useState } from 'react';

const TicketForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [teamMember, setTeamMember] = useState('');

    const teamMembers = [
        { name: 'Alice', skills: ['React', 'NodeJS'] },
        { name: 'Bob', skills: ['Java', 'Python'] },
        { name: 'Charlie', skills: ['Angular', 'Django'] },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, deadline, teamMember }),
        });
        const data = await response.json();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Deadline:</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div>
                <label>Team Member:</label>
                <select value={teamMember} onChange={(e) => setTeamMember(e.target.value)}>
                    {teamMembers.map((member, index) => (
                        <option key={index} value={member.name}>
                            {member.name} ({member.skills.join(', ')})
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TicketForm;