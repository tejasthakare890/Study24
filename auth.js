const db = require('./Database');
const app = require('./app'); // Assuming 'app.js' is where you define the app object


function authenticateUser(username, password, callback) {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      // Check if any rows were returned from the query
      if (results && results.length > 0) {
        callback(null, true); // User exists, credentials are valid
      } else {
        callback(null, false); // User does not exist or credentials are invalid
      }
    }
  });
}

module.exports = { authenticateUser };
