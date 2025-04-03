import React, { useState } from 'react';

const TicketForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [teamMember, setTeamMember] = useState('');
    const [file, setFile] = useState(null);

    const teamMembers = [
        { name: 'Alice', skills: ['React', 'NodeJS'] },
        { name: 'Bob', skills: ['Java', 'Python'] },
        { name: 'Charlie', skills: ['Angular', 'Django'] },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        const fileResponse = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        const fileData = await fileResponse.json();

        const ticketResponse = await fetch('http://localhost:5000/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, deadline, teamMember, file: fileData.file }),
        });
        const ticketData = await ticketResponse.json();
        onSubmit(ticketData);
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
            <div>
                <label>Upload File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TicketForm;