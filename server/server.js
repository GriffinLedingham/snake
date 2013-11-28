var fs = require('fs')
var http = require('http');
var express = require('express');
var app = express();
var Room = require('./class/room');
var Player = require('./class/player');
var Power = require('./class/power');

app.use(express.static("client/public"));

var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(8142);

io.sockets.on('connection', function (socket) {
    socket.on('connect',function(){

    });
});




