const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: '127.0.0.1', // Update host to use correct loopback address
  user: 'root',
  password: 'Tejas',
  database: 'users_db',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    // Handle the error, such as throwing an exception or taking appropriate action
    throw err; // Example: throw an exception
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
