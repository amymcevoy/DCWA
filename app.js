const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3004;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`

        <h1>G00413220</h1>
        <ul>
            <li><a href="/students">Students</a></li>
            <li><a href="/grades">Grades</a></li>
            <li><a href="/lecturer">Lecturer</a></li>
        </ul>
    `);
});

// Routers
const studentsRouter = require('./pages/students');
const gradesRouter = require('./pages/grades')
const lecturersRouter = require('./pages/lecturer');
const updateStudentRouter = require('./pages/updateStudent');

// Routes
app.use('/students', studentsRouter);
app.use('/grades', gradesRouter);
app.use('/lecturer', lecturersRouter);
app.use('/students/update', updateStudentRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});