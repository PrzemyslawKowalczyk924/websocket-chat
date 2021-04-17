const express = require('express');
const path = require('path');
const socket = require('socket.io');

const users = [];
const messages = [];

const app = express();

// Serve static files from the client app
app.use(express.static(path.join(__dirname, '/client')));

app.get('/client', (req, res) => {
  res.sendFile('index.html');
});

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id = ' + socket.id);
  socket.on('join', (user) => {
    users.push(user);
    console.log('Users online', users);
  });
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });  
  socket.on('disconnect', () => { 
    console.log('User offline'); 
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left') 
    const itemToBeRemoved = { name: socket.name, id: socket.id }
    users.splice(itemToBeRemoved, 1);
    console.log('Users online: ', users); 
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
 
});