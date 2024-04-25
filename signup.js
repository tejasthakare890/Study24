const db = require('./Database');
const app = require('./app'); // Assuming 'app.js' is where you define the app object


function createUser(username, password, email, callback) {
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, password, email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      callback(err, null);
    } else {
      callback(null, results.insertId); // return the ID of the newly inserted user
    }
  });
}

module.exports = { createUser };
