const mysql = require('mysql2');

// Connection pool for first database
const pool1 = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1', // Update host to use correct loopback address
    user: 'REMOTE1',
    port: '3306',
    password: 'TEJAS',
    database: 'student' // your first database name
});

// Connection pool for second database
const pool2 = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1', // Update host to use correct loopback address
    user: 'REMOTE1',
    port: '3306',
    password: 'TEJAS',
    database: 'users_db',
});

// Print a message when connection is established
pool1.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        // Handle the error
        return;
    }
    console.log('Connected to MySQL database for pool1');
    connection.release(); // Release the connection back to the pool
});

// Print a message when connection is established
pool2.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        // Handle the error
        return;
    }
    console.log('Connected to MySQL database for pool2');
    connection.release(); // Release the connection back to the pool
});

module.exports = { pool1, pool2 };
