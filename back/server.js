const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users');

const routes = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use(routes);

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
// };

app.use(cors()); //allow all origins

io.on('connection', (socket) => {
  console.log('1 ', socket.id);
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}.`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined!`,
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log('2 ', socket.id);
    const user = getUser(socket.id);
    console.log('user', user);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});