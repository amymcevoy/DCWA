const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load variables

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'proj2024MongoDB';

let db; 

// Define the connectMongo function
const connectMongo = async () => {
    if (db) return db; // Return connection
    try {
        const client = new MongoClient(mongoUrl);
        await client.connect();
        console.log(`Connected to MongoDB: ${dbName}`);
        db = client.db(dbName); // Connect to database
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err; 
    }
};

module.exports = connectMongo;
  