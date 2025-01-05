const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3004;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MySql connection pool setup
const pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',  
  password: 'root',  
  database: 'proj2024mysql'
});

pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log('Connected');
    connection.release(); // When done with the connection, release it.
  });
  
//MongoDB connection setup
const mongoUrl = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUrl);
let mongoDB;

mongoClient.connect(err => {
  if (err) throw err;
  mongoDB = mongoClient.db('proj2024MongoDB'); 
  console.log('Connected to MongoDB');
});

// Define Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Project!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});