const express = require('express');
const router = express.Router();
const connectMongo = require('../db/mongodb'); // MongoDB connection
const mysql = require('../db/mysql'); 
const { ObjectId } = require('mongodb');

module.exports = router;
