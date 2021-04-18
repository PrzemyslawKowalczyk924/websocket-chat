const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

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
    users.push({name: user, id: socket.id});
    console.log('Users online', users);
    socket.broadcast.emit('join', {author: 'Chat Bot', content: `${user} has joined the conversation!`});
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });  

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left') 
   /*  const itemToBeRemoved = { name: socket.name, id: socket.id }
    console.log('Users online: ', users);  */
    const itemToBeRemoved = users.find(users => users.id === socket.id);
    const userToRemove = users.indexOf(itemToBeRemoved);
    if(itemToBeRemoved) {
      socket.broadcast.emit('itemToBeRemoved', { author: 'Chat Bot', content: itemToBeRemoved.name + 'has left the conversation :(' });
      users.splice(userToRemove, 1);
    }
  });

  console.log('I\'ve added a listener on message and disconnect events \n');
});