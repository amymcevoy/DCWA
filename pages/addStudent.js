const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql'); 

// GET route for the Add Student form (Mostly taken from to update student form)
router.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add New Student</title>
        </head>
        <body>
            <h1>Add New Student</h1>
            <form action="/students/add" method="post">
                <label for="sid">Student ID:</label><br>
                <input type="text" id="sid" name="sid" required><br>
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name" required><br>
                <label for="age">Age:</label><br>
                <input type="number" id="age" name="age" required><br><br>
                <button type="submit">Add Student</button>
            </form>
            <a href="/students">Back to Students</a>
        </body>
        </html>
    `;
    res.send(html);
});

// POST route to handle form submission for adding a new student
// Also taken from studentUpdate
router.post('/', async (req, res) => {
    const { sid, name, age } = req.body;

    // Validation
    const errors = [];
    if (!sid || sid.length < 3) {
        errors.push('Student ID must be at least 3 characters long.');
    }
    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters long.');
    }
    if (!age || age <= 18) {
        errors.push('Age must be greater than 18.');
    }
    if (errors.length > 0) {
        
        // Redisplay the form with errors
        const errorHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Add New Student</title>
            </head>
            <body>
                <h1>Add New Student</h1>
                ${errors.map(err => `<p style="color:red;">${err}</p>`).join('')}
                <form action="/students/add" method="post">
                    <label for="sid">Student ID:</label><br>
                    <input type="text" id="sid" name="sid" value="${sid || ''}" required><br>
                    <label for="name">Name:</label><br>
                    <input type="text" id="name" name="name" value="${name || ''}" required><br>
                    <label for="age">Age:</label><br>
                    <input type="number" id="age" name="age" value="${age || ''}" required><br><br>
                    <button type="submit">Add Student</button>
                </form>
                <a href="/students">Back to Students</a>
            </body>
            </html>
        `;
        return res.send(errorHtml);
    }
    try {
        const query = 'INSERT INTO student (sid, name, age) VALUES (?, ?, ?)';
        await mysql.query(query, [sid, name, age]);
        res.redirect('/students');
    } catch (err) {
        console.error('Error adding new student:', err);
        res.status(500).send('Failed to add new student.');
    }
});

module.exports = router;
