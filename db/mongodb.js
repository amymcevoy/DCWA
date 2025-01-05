const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'proj2024MongoDB';

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

module.exports = connect;
  