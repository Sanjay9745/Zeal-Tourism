// app.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve an HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/holidays', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'holidays.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});