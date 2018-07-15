var socket = io();

socket.on('connect', function (){
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'kunya',
    text: 'yedya'
  });
});

socket.on('disconnect', function (){
  console.log('disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('new email', message);
});
