
const express = require('express');
var cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});




app.get('/', (req, res) => {
  res.send('<h1>Socket.io server started successfully</h1>');
});


io.on('connection', (socket) => {
  console.log('a user connected', );

  // socket.broadcast.emit('someone connect');

  socket.on('login', (data) => {
    console.log('user login', data);
    let user = {
      id: Math.floor(Math.random() * 1000000),
      name: data
    }
    socket.broadcast.emit('someone connect', user);
  });

  socket.on('disconnect', (data) => {
    console.log('user disconnected',data);
    socket.broadcast.emit('someone disconnect', data);
  });

  socket.on('chat message', (data) => {
    console.log('message: ' + data);
    io.emit('chat message', data);
  });

  socket.on('user typing', (value) => {
    console.log('value: ' + value);
    socket.broadcast.emit('user typing', value);
  });

});


server.listen(3030, () => {
  console.log('listening on *:3030');
});