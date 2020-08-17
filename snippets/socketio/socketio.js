var http = require('http');
var fs = require('fs');

// client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(content);
    });
});

//---

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});


io.sockets.on('connection', function (socket) {
    //socket.emit('message_serveur', 'Vous êtes bien connecté !');

    socket.on('petit_nouveau', function (pseudo) {
        socket.pseudo = pseudo;
    });

    socket.broadcast.emit('message_serveur', 'Message à toutes les unités.');

    socket.on('message_client', function (message_client) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message_client);
    });

});


server.listen(8080);