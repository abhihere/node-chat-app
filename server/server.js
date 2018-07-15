const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/messages');

const port = process.env.PORT || 7000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message)=>{
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    //
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
})
