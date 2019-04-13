var socket = require('socket.io-client')('http://184.75.224.246:6300/');

socket.on('connect', function(){
    console.log('connect');
});

socket.on('connection', function (socket) {
    console.log('a user connected');
});

socket.on('connection update', function(data){
    console.log('connection update:', data);
});

socket.on('disconnect', function(){
    console.log('disconnect');
});