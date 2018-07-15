const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'kdbhai@gmail.com',
    text: 'yedas kay',
    createdAt: 123
  });

  socket.on('createMessage', (message)=>{
    console.log(message);
  });

  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
})
