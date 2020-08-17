'use strict';

const http = require('http');
const url = require('url');

const server = http.createServer(function (request, response) {
    var page = url.parse(request.url).pathname;
    console.log(page);
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    if (page == '/') {
        response.write('welcome page');
    } else if (page == '/blog') {
        response.write('blog part');
    } else if (page != '/blog') {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write('OUPS');
    }
    response.end();
    console.log(request.headers);
    console.log(response.getHeaders());
});
server.listen(8080);