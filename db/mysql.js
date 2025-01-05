const mysql = require('mysql2/promise');

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
  

  module.exports = pool;
