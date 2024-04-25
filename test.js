const db = require('./Database');

// Test the database connection
db.promise().query('SELECT 1 + 1 AS solution')
  .then(([results, fields]) => {
    console.log('Database connection test successful');
    console.log('The solution is:', results[0].solution);
  })
  .catch((err) => {
    console.error('Error executing query:', err);
  })
  .finally(() => {
    // Close the database connection
    db.end();
  });
