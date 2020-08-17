var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    console.log(params);
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    if ('prenom' in params && 'nom' in params) {
        res.write('mon prenom est ' + params['prenom'] + ' et le nom ' + params['nom']);
    } else {
        res.write('qui etes vous ?');
    }
    res.end();
});
server.listen(8080);