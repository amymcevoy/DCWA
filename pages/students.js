const express = require('express');
const router = express.Router();
const pool = require('../db/mysql.js');


// GET Display all students in an HTML table
router.get('', async (req, res) => {
    try {
        // Define the query to fetch all students
        const query = 'SELECT sid, name, age FROM student ORDER BY sid ASC';
        
        // Execute the query
        const [students] = await pool.query(query);

        // Generate HTML response to display students ( table created using chatgpt)
        let html = `

            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Students List</title>
                    <a href="/students/add">Add Student</a> | <a href="/">Home</a>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Students</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(student => `
                                <tr>
                                    <td>${student.sid}</td>
                                    <td>${student.name}</td>
                                    <td>${student.age}</td>
                                    <td><a href="/students/update/${student.sid}">Update</a></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
        `;

        // Send the generated HTML response
        res.send(html);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Failed to fetch students');
    }
});

module.exports = router;
