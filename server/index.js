const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { listeners } = require('process');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
});

app.use(router);

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        callback();
    })

    socket.on('disconnect', () => {
        console.log('User has left');
    })
});

server.listen(PORT, () =>
    console.log('Server has started on port ' + server.address().port)
);