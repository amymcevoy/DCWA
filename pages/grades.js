const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

//GET route to display grades
router.get('/',async (req, res) => {
    try {
      // Query to fetch all grades
      const [grades] = await mysql.query('SELECT sid, mid, grade FROM `grade` ORDER BY sid ASC, mid ASC');

      // Generate HTML to display grades
      const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Grades</title>
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
              <h1>Grades</h1>
              <a href="/">Back to Home</a> | <a href="/grades/add">Add Grade</a>
              <table>
                  <thead>
                      <tr>
                          <th>Student ID</th>
                          <th>Module ID</th>
                          <th>Grade</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${grades.map(grade => `
                          <tr>
                              <td>${grade.sid}</td>
                              <td>${grade.mid}</td>
                              <td>${grade.grade}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>
          </body>
          </html>
      `;
      res.send(html);
  } catch (err) {
      console.error('Error fetching grades:', err);
      res.status(500).send('Failed to fetch grades.');
  }
});

module.exports = router;