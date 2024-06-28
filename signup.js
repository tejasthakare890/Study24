const { pool1, pool2 } = require('./Database');

function createUser(username, password, email, callback) {
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    pool2.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            callback(err, null);
            return;
        }
        connection.query(query, [username, password, email], (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                console.error('Database error:', err);
                callback(err, null);
            } else {
                callback(null, results.insertId); // return the ID of the newly inserted user
            }
        });
    });
}

module.exports = { createUser };
