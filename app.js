// Import required modules
const express = require('express');
const app = express();
const { authenticateUser } = require('./auth');
const { createUser } = require('./signup');
const { isAuthenticated } = require('./A');
const cors = require('cors'); // Import the cors package
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module for file paths
const { pool1, pool2 } = require('./Database'); 
const fs = require('fs'); // Import the file system module
const morgan = require('morgan');

// Use morgan middleware to log incoming requests
app.use(morgan('dev'));


// Middleware to parse JSON data in requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Add middleware for session management
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'study24', // Use environment variable for session secret
  resave: false,
  saveUninitialized: false,
}));

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Feedback

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST request to submit feedback
app.post('/submit-feedback', (req, res) => {
    const feedbackText = req.body.feedbackText;

    // Insert feedback into database
    pool1.query('INSERT INTO feedback (feedback_text) VALUES (?)', [feedbackText], (err, result) => {
        if (err) {
            console.error('Error submitting feedback:', err);
            res.status(500).send('Error submitting feedback. Please try again later.');
        } else {
            console.log('Feedback submitted successfully!');
            res.status(200).send('Feedback submitted successfully!');

            // Create a file to save the feedback if necessary
            const fileName = `feedback_${Date.now()}.txt`;
            fs.writeFile(fileName, feedbackText, (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                } else {
                    console.log('File created successfully:', fileName);
                }
            });
        }
    });
});
// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Assuming authenticateUser is a function that checks credentials
  authenticateUser(username, password, (err, isAuthenticated) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (isAuthenticated) {
      req.session.user = { username }; // Set user data in session
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  // Call createUser function from signup.js
  createUser(username, password, email, (err, userId) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'User created', userId });
    }
  });
});

// Logout route
app.post('/logout', (req, res) => {
  // Check if the user is logged in using session
  if (req.session.user) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  } else {
    res.status(401).json({ error: 'User not logged in' });
  }
});

// Example protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard!'); // Only authenticated users can access this route
});

// Specify the server to listen on all network interfaces
const PORT = process.env.PORT || 5500;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app; // Export the app object for use in other files
