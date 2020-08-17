var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent');

// pour le client
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//---
io.sockets.on('connection', function (socket, pseudo) {

    socket.on('ajout_utilisateur', function (pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('ajout_utilisateur', pseudo);
    });

    socket.on('message_client', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message_client', {
            pseudo: socket.pseudo,
            message: message_client
        });
    });

});

server.listen(8080);