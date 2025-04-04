const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const feedbackRoutes = require('./routes/feedback');
require('dotenv').config();

const app = express();
var cors = require('cors');

const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;

// MongoDB connection
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@brunosilvadevdb.dbnhrcv.mongodb.net/?retryWrites=true&w=majority&appName=BrunoSilvaDevDB`;
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            bucketName: 'uploads',
            filename: file.originalname,
        };
    },
});
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/feedback', feedbackRoutes);
app.use(cors())

let tickets = [];
const teamMembers = [
    { name: 'Alice', skills: ['React', 'NodeJS'] },
    { name: 'Bob', skills: ['Java', 'Python'] },
    { name: 'Charlie', skills: ['Angular', 'Django'] },
];

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

// File retrieval route
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'No files exist' });
        }
        return res.json(files);
    });
});

// File download route
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file) {
            return res.status(404).json({ err: 'No file exists' });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

// Ticket creation route
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

// Get all tickets route
app.get('/tickets', (req, res) => {
    res.json(tickets);
});

// Skill-based ticket assignment route
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