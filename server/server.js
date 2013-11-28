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

app.use(express.static("client/public"));

var server = http.createServer(app);

io = require('socket.io').listen(server);

server.listen(8142);

var room1 = new Room(1);
room1.start();

var snake = new Player(0);
room1.addPlayer(snake);

io.sockets.on('connection', function (socket) {
    
});




