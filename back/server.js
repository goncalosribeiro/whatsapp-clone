const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();
const validator = require('validator');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users');

const routes = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'https://www.goncaloribeiro.dev/chat-clone/*',
  },
});

const port = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use('/api/chat-clone', routes);

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
// };

app.use(
  cors({
    origin: 'https://www.goncaloribeiro.dev/chat-clone/*',
  })
); //allow all origins

const getTime = () => {
  let time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  time = hours + ':' + minutes;
  return time;
};

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name: validator.escape(name),
      room: validator.escape(room),
      time: getTime(),
    });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}.`,
      time: getTime(),
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined!`,
      time: getTime(),
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.name,
      text: validator.escape(message),
      time: getTime(),
    });
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
