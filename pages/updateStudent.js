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
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
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


// POST route to handle the form submission
router.post('/:sid', async (req, res) => {
    const { sid } = req.params;
    const { name, age } = req.body;

     // Validation
     const errors = [];
    if (!name || name.length < 2) 
        {
           errors.push('Name must be at least 2 characters long');
        }
    if (!age || age <= 18)
        {
            errors.push('Age must be greater than 18');
        }
        
    try {
        await mysql.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
        res.redirect('/students');
    } catch (err) {
        console.error('Failed to update student:', err);
        res.status(500).send('Failed to update student.');
    }
});

module.exports = router;
