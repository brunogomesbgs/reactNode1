const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tickets = [];
const teamMembers = [
    { name: 'Alice', skills: ['React', 'NodeJS'] },
    { name: 'Bob', skills: ['Java', 'Python'] },
    { name: 'Charlie', skills: ['Angular', 'Django'] },
];

app.post('/tickets', (req, res) => {
    const { title, description, deadline, teamMember } = req.body;
    const ticket = {
        id: tickets.length + 1,
        title,
        description,
        deadline,
        teamMember,
        status: 'Pending',
    };
    tickets.push(ticket);
    res.status(201).json(ticket);
});

app.get('/tickets', (req, res) => {
    res.json(tickets);
});

app.post('/assign-ticket', (req, res) => {
    const { title, description, deadline, requiredSkill } = req.body;
    const suitableMember = teamMembers.find(member => member.skills.includes(requiredSkill));

    if (suitableMember) {
        const ticket = {
            id: tickets.length + 1,
            title,
            description,
            deadline,
            teamMember: suitableMember.name,
            status: 'Assigned',
        };
        tickets.push(ticket);
        res.status(201).json(ticket);
    } else {
        res.status(400).json({ message: 'No suitable team member found' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});