const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

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


module.exports = router;
