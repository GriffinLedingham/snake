var fs = require('fs')
var http = require('http');
var express = require('express');
var app = express();
Room = require('./class/room');
Player = require('./class/player');
Power = require('./class/power');
Head = require('./class/head');
Body = require('./class/body');
Vector2 = require('./class/vector2');

extend = require('util')._extend;


app.use(express.static("client/public"));

var server = http.createServer(app);

io = require('socket.io').listen(server);

io.set('log level', 0);

server.listen(8142);

var room1 = new Room(1);
room1.start();



io.sockets.on('connection', function (socket) {

    var uuid = guid();
   
    var snake = new Player(uuid,socket);
    snake.head.child = new Body(1,0,snake.head);
    snake.head.child.child = new Body(2,0,snake.head.child);
    room1.addPlayer(snake);

    socket.join(1);

    socket.on('key',function(data){
        snake.direction = new Vector2(data.x,data.y);
    });

    socket.on('disconnect',function(){
        console.log('disconnect');
        room1.removePlayer(snake);
    });

});

function s4(){
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid(){
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
}




