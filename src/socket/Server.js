/**
 * This is a stand alone socket.io server
 * Install the node package before using.
 */

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(1300);

console.log('listening...');

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}

var clients = [];
io.on('connection', function (socket) {
  console.log('connected');

  clients.push(socket.id);

  io.emit('connection update', { id: socket.id, all: clients, action: 'add' });

  socket.on('disconnect', function () {
    console.log('Got disconnect!');

    var i = clients.indexOf(socket.id);
    clients.splice(i, 1);

    io.emit('connection update', { id: socket.id, all: clients, action: 'remove' });
  });

  socket.on('execute', function (msg) {
    console.log('Executing ' + msg.action, msg);
    if (msg.mode && msg.mode === 'direct') {
      io.to(msg.receiver).emit('execute', msg);
    } else {
      io.emit('execute', msg);
    }
  });

});
