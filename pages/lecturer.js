const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection details
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'proj2024MongoDB'; 


module.exports = router;
