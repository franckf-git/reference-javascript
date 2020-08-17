var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('Yellow !');
});

server.on('close', function () { // On écoute l'évènement close
  console.log('oh nooooooooooooooooooo');
})

server.on('close', function () { // On écoute l'évènement close
  console.log('Bye bye !');
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close