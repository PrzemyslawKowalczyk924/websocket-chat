const express = require('express');
const path = require('path');
const app = express();

const messages = [];

// Serve static files from the client app
app.use(express.static(path.join(__dirname, '/client')));

app.get('/client', (req, res) => {
  res.sendFile('index.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});