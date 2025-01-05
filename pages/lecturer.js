const express = require('express');
const router = express.Router();
const connectMongo = require('../db/mongodb'); 
const mysql = require('../db/mysql'); 
const { ObjectId } = require('mongodb');

// GET to display all lecturers sorted by  ID
router.get('/', async (req, res) => {
    try {
        const db = await connectMongo();
        const lecturers = await db.collection('lecturers').find({}).sort({ _id: 1 }).toArray();

        // HTML to display lecturers
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lecturers</title>
            </head>
            <body>
                <h1>Lecturers</h1>
                <a href="/">Back to Home</a>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Lecturer ID</th>
                            <th>Name</th>
                            <th>Department ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lecturers.map(lecturer => `
                            <tr>
                                <td>${lecturer._id}</td>
                                <td>${lecturer.name}</td>
                                <td>${lecturer.did}</td>
                                <td>
                                    <a href="/lecturers/delete/${lecturer._id}">Delete</a>
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
        res.status(500).send('<h1>Failed to fetch lecturers</h1>');
    }

});

// Delete lecturer route
router.get('/delete/:lid', async (req, res) => {
    const lecturerId = req.params.lid;

    try {
        const db = await connectMongo(); // Connect to MongoDB
        
        // Fetch the lecturers details from MongoDB
         const lecturer = await db.collection('lecturers').findOne({ _id: new ObjectId(lecturerId) });
    
    if (!lecturer) {
        return res.status(404).send('<h1>Lecturer not found.</h1>');
    } 
    console.log(`Lecturer infor fetched successfully`);
    }
    catch (err) {
        console.error('Error deleting lecturer:', err);
        res.status(500).send('<h1>Server error</h1>');
    }
});

module.exports = router;
