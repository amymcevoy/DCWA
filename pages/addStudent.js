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
module.exports = router;
