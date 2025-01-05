const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

// GET route for the update form
router.get('/:sid', async (req, res) => {
    const { sid } = req.params;
    try {
        const [results] = await mysql.query('SELECT * FROM student WHERE sid = ?', [sid]);
        const student = results[0];
        if (!student) {
            return res.status(404).send('Student not found.');
        }

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Update Student</title>
            </head>
            <body>
                <h1>Update Student</h1>
                <form action="/students/update/${sid}" method="post">
                    <label for="name">Name:</label><br>
                    <input type="text" id="name" name="name" value="${student.name}" required><br>
                    <label for="age">Age:</label><br>
                    <input type="number" id="age" name="age" value="${student.age}" required><br><br>
                    <button type="submit">Update</button>
                </form>
                <a href="/students">Back to List</a>
            </body>
            </html>
        `;
        res.send(html);
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Error fetching student details.');
    }
});

module.exports = router;
