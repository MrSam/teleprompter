var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('client.html');
});


app.get('/server', function(req, res){
  res.sendfile('server.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('pause', function(){io.emit('pause');console.log('pause'); });
  socket.on('resume', function(){io.emit('resume'); console.log('resume');});
  socket.on('speedup', function(){io.emit('speedup'); console.log('+');});
  socket.on('slowdown', function(){io.emit('slowdown'); console.log('-');});
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
