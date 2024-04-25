const { authenticateUser } = require('./auth');

// Instead of 'body-parser', use Express's built-in 'express.json()' middleware
const express = require('express');
const app = express();
app.use(express.json());

function isAuthenticated(req, res, next) {
  const { username, password } = req.body;
  authenticateUser(username, password, (err, isAuthenticated) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (isAuthenticated) {
      next(); // User is authenticated, continue to the next middleware/route
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });
}

module.exports = { isAuthenticated };
