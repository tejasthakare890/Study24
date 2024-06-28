const { pool1, pool2 } = require('./Database');

function authenticateUser(username, password, callback) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    pool2.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            callback(err, null);
            return;
        }
        connection.query(query, [username, password], (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                console.error('Database error:', err);
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
    });
}

module.exports = { authenticateUser };
