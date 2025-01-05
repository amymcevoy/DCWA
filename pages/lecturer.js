const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// MongoDB connection details
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'proj2024MongoDB'; 

let mongoDB;
// Connect to MongoDB
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    mongoDB = client.db(dbName);

});

// GET to display all lecturers
router.get('/', async (req, res) => {
    try {
        const lecturers = await mongoDB.collection('lecturer').find().toArray();  // Get all lecturers
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lecturers</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Lecturers</h1>
                <a href="/">Back to Home</a>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Dept ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lecturers.map(lecturer => `
                            <tr>
                                <td>${lecturer._id}</td>
                                <td>${lecturer.name}</td>
                                <td>${lecturer.did}</td>
                                <td>
                                    <a href="/lecturer/delete/${lecturer._id}">Delete</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        res.send(html);
    } catch (err) {
        console.error('Error fetching lecturers:', err);
        res.status(500).send('Failed to fetch lecturers.');
    }
});


module.exports = router;
